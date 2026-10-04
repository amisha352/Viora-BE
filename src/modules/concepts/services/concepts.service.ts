import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';

import { Concept } from '../entities/concept.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import {
  CreateConceptDto,
  UpdateConceptDto,
  ConceptQueryDto,
  ConceptResponseDto,
  MoveConceptDto,
} from '../dto/concept.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';
import { EntityStatus } from '../../../common/enums/entity-status.enum';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async findAll(
    query: ConceptQueryDto,
  ): Promise<PaginatedResponseDto<ConceptResponseDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const qb = this.conceptRepository.createQueryBuilder('concept');

    if (query.subjectId) {
      qb.andWhere('concept.subjectId = :subjectId', { subjectId: query.subjectId });
    }

    if (query.parentId !== undefined) {
      qb.andWhere('concept.parentId = :parentId', { parentId: query.parentId });
    }

    if (query.status) {
      qb.andWhere('concept.status = :status', { status: query.status });
    }

    if (query.search) {
      qb.andWhere(
        '(concept.title ILIKE :search OR concept.slug ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('concept.order', 'ASC');
    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      success: true,
      data: items,
      pagination: { page, limit, total },
      message: 'Concepts fetched successfully',
    };
  }

  async findTree(subjectId: string): Promise<ApiResponseDto<ConceptResponseDto[]>> {
    const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const roots = await this.conceptRepository.find({
      where: { subjectId, parentId: IsNull() },
      order: { order: 'ASC' },
      relations: ['children'],
    });

    const tree = await Promise.all(roots.map((root) => this.loadChildren(root)));

    return {
      success: true,
      data: tree,
      message: 'Concept tree fetched successfully',
    };
  }

  async findOne(id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    const concept = await this.conceptRepository.findOne({ where: { id } });

    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    return {
      success: true,
      data: concept,
      message: 'Concept fetched successfully',
    };
  }

  async create(dto: CreateConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    const subject = await this.subjectRepository.findOne({ where: { id: dto.subjectId } });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const exists = await this.conceptRepository.findOne({
      where: { slug: dto.slug, subjectId: dto.subjectId },
    });
    if (exists) {
      throw new ConflictException('Concept slug already exists for this subject');
    }

    let depth = 0;
    let parent: Concept | null = null;

    if (dto.parentId) {
      parent = await this.conceptRepository.findOne({ where: { id: dto.parentId } });
      if (!parent) {
        throw new NotFoundException('Parent concept not found');
      }
      if (parent.subjectId !== dto.subjectId) {
        throw new ConflictException('Parent concept must belong to the same subject');
      }
      depth = parent.depth + 1;
    }

    const concept = this.conceptRepository.create({
      subjectId: dto.subjectId,
      parentId: dto.parentId ?? null,
      title: dto.title,
      slug: dto.slug,
      description: dto.description ?? null,
      order: dto.order ?? 0,
      depth,
      metadata: dto.metadata ?? null,
      parent: parent ?? undefined,
    });

    const saved = await this.conceptRepository.save(concept);

    return {
      success: true,
      message: 'Concept created successfully',
      data: saved,
    };
  }

  async update(
    id: string,
    dto: UpdateConceptDto,
  ): Promise<ApiResponseDto<ConceptResponseDto>> {
    const concept = await this.conceptRepository.findOne({ where: { id } });

    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    if (dto.slug) {
      const subjectId = dto.subjectId ?? concept.subjectId;
      const duplicate = await this.conceptRepository.findOne({
        where: { slug: dto.slug, subjectId },
      });

      if (duplicate && duplicate.id !== id) {
        throw new ConflictException('Concept slug already exists for this subject');
      }
    }

    if (dto.subjectId && dto.subjectId !== concept.subjectId) {
      const subject = await this.subjectRepository.findOne({ where: { id: dto.subjectId } });
      if (!subject) {
        throw new NotFoundException('Subject not found');
      }
    }

    Object.assign(concept, dto);
    const updated = await this.conceptRepository.save(concept);

    return {
      success: true,
      message: 'Concept updated successfully',
      data: updated,
    };
  }

  async move(
    id: string,
    dto: MoveConceptDto,
  ): Promise<ApiResponseDto<ConceptResponseDto>> {
    const concept = await this.conceptRepository.findOne({ where: { id } });

    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    if (dto.newParentId !== undefined) {
      if (dto.newParentId === null) {
        concept.parentId = null;
        concept.depth = 0;
        concept.parent = null;
      } else {
        if (dto.newParentId === id) {
          throw new ConflictException('Concept cannot be its own parent');
        }

        const parent = await this.conceptRepository.findOne({
          where: { id: dto.newParentId },
        });
        if (!parent) {
          throw new NotFoundException('Parent concept not found');
        }
        if (parent.subjectId !== concept.subjectId) {
          throw new ConflictException('Parent concept must belong to the same subject');
        }

        concept.parentId = parent.id;
        concept.depth = parent.depth + 1;
        concept.parent = parent;
      }
    }

    if (dto.newOrder !== undefined) {
      concept.order = dto.newOrder;
    }

    const updated = await this.conceptRepository.save(concept);

    return {
      success: true,
      message: 'Concept moved successfully',
      data: updated,
    };
  }

  async publish(id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    const concept = await this.conceptRepository.findOne({ where: { id } });

    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    concept.status = EntityStatus.PUBLISHED;
    concept.publishedAt = new Date();

    const updated = await this.conceptRepository.save(concept);

    return {
      success: true,
      message: 'Concept published successfully',
      data: updated,
    };
  }

  async remove(id: string): Promise<ApiResponseDto<null>> {
    const concept = await this.conceptRepository.findOne({ where: { id } });

    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    await this.conceptRepository.softRemove(concept);

    return {
      success: true,
      message: 'Concept deleted successfully',
      data: null,
    };
  }

  private async loadChildren(concept: Concept): Promise<Concept> {
    const children = await this.conceptRepository.find({
      where: { parentId: concept.id },
      order: { order: 'ASC' },
    });

    concept.children = await Promise.all(children.map((child) => this.loadChildren(child)));
    return concept;
  }
}
