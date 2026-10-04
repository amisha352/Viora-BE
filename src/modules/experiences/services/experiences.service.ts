import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LearningExperience } from '../entities/learning-experience.entity';
import { LearningExperienceContent } from '../entities/learning-experience-content.entity';
import { Concept } from '../../concepts/entities/concept.entity';
import {
  CreateLearningExperienceDto,
  UpdateLearningExperienceDto,
  LearningExperienceQueryDto,
  LearningExperienceResponseDto,
  LearningExperienceHtmlContentDto,
} from '../dto/learning-experience.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';
import { LearningExperienceMapper } from '../mappers/learning-experience.mapper';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(LearningExperience)
    private readonly experienceRepository: Repository<LearningExperience>,
    @InjectRepository(LearningExperienceContent)
    private readonly contentRepository: Repository<LearningExperienceContent>,
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,
  ) {}

  async findAll(
    query: LearningExperienceQueryDto,
  ): Promise<PaginatedResponseDto<LearningExperienceResponseDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const qb = this.experienceRepository.createQueryBuilder('experience');

    if (query.conceptId) {
      qb.andWhere('experience.conceptId = :conceptId', { conceptId: query.conceptId });
    }

    if (query.type) {
      qb.andWhere('experience.type = :type', { type: query.type });
    }

    if (query.rendererKey) {
      qb.andWhere('experience.rendererKey = :rendererKey', {
        rendererKey: query.rendererKey,
      });
    }

    if (query.status) {
      qb.andWhere('experience.status = :status', { status: query.status });
    }

    if (query.search) {
      qb.andWhere(
        '(experience.title ILIKE :search OR experience.slug ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('experience.order', 'ASC');
    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [items, total] = await qb.getManyAndCount();
    const hasHtmlMap = await this.buildHasHtmlMap(items.map((item) => item.id));

    return {
      success: true,
      data: LearningExperienceMapper.toResponseList(items, hasHtmlMap),
      pagination: { page, limit, total },
      message: 'Experiences fetched successfully',
    };
  }

  async findByConceptId(
    conceptId: string,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto[]>> {
    const concept = await this.conceptRepository.findOne({ where: { id: conceptId } });
    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    const experiences = await this.experienceRepository.find({
      where: { conceptId },
      order: { order: 'ASC' },
    });
    const hasHtmlMap = await this.buildHasHtmlMap(experiences.map((item) => item.id));

    return {
      success: true,
      data: LearningExperienceMapper.toResponseList(experiences, hasHtmlMap),
      message: 'Experiences fetched successfully',
    };
  }

  async findContentByConceptId(
    conceptId: string,
  ): Promise<ApiResponseDto<LearningExperienceHtmlContentDto[]>> {
    const concept = await this.conceptRepository.findOne({ where: { id: conceptId } });
    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    const rows = await this.contentRepository
      .createQueryBuilder('content')
      .innerJoin('content.learningExperience', 'experience')
      .where('experience.conceptId = :conceptId', { conceptId })
      .andWhere('experience.deletedAt IS NULL')
      .orderBy('experience.order', 'ASC')
      .getMany();

    return {
      success: true,
      data: rows.map((row) => ({
        learningExperienceId: row.learningExperienceId,
        htmlContent: row.htmlContent,
        version: row.version,
      })),
      message: 'Experience content fetched successfully',
    };
  }

  async findOne(id: string): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return {
      success: true,
      data: LearningExperienceMapper.toResponse(experience, await this.hasHtml(id)),
      message: 'Experience fetched successfully',
    };
  }

  async create(
    dto: CreateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    const concept = await this.conceptRepository.findOne({ where: { id: dto.conceptId } });
    if (!concept) {
      throw new NotFoundException('Concept not found');
    }

    const exists = await this.experienceRepository.findOne({
      where: { slug: dto.slug, conceptId: dto.conceptId },
    });
    if (exists) {
      throw new ConflictException('Experience slug already exists for this concept');
    }

    const experience = this.experienceRepository.create({
      conceptId: dto.conceptId,
      title: dto.title,
      slug: dto.slug,
      description: dto.description ?? null,
      type: dto.type,
      rendererKey: dto.rendererKey,
      configuration: dto.configuration ?? {},
      contentVersion: dto.contentVersion ?? '1.0.0',
      order: dto.order ?? 0,
    });

    const saved = await this.experienceRepository.save(experience);

    if (dto.htmlContent !== undefined) {
      await this.contentRepository.save(
        this.contentRepository.create({
          learningExperienceId: saved.id,
          htmlContent: dto.htmlContent,
        }),
      );
    }

    return {
      success: true,
      message: 'Experience created successfully',
      data: LearningExperienceMapper.toResponse(saved, dto.htmlContent !== undefined),
    };
  }

  async update(
    id: string,
    dto: UpdateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    if (dto.slug) {
      const conceptId = dto.conceptId ?? experience.conceptId;
      const duplicate = await this.experienceRepository.findOne({
        where: { slug: dto.slug, conceptId },
      });

      if (duplicate && duplicate.id !== id) {
        throw new ConflictException('Experience slug already exists for this concept');
      }
    }

    if (dto.conceptId && dto.conceptId !== experience.conceptId) {
      const concept = await this.conceptRepository.findOne({ where: { id: dto.conceptId } });
      if (!concept) {
        throw new NotFoundException('Concept not found');
      }
    }

    const { htmlContent, ...experienceFields } = dto;
    Object.assign(experience, experienceFields);
    const updated = await this.experienceRepository.save(experience);

    if (htmlContent !== undefined) {
      const existing = await this.contentRepository.findOne({
        where: { learningExperienceId: id },
      });

      if (existing) {
        existing.htmlContent = htmlContent;
        await this.contentRepository.save(existing);
      } else {
        await this.contentRepository.save(
          this.contentRepository.create({
            learningExperienceId: id,
            htmlContent,
          }),
        );
      }
    }

    return {
      success: true,
      message: 'Experience updated successfully',
      data: LearningExperienceMapper.toResponse(updated, await this.hasHtml(id)),
    };
  }

  async remove(id: string): Promise<ApiResponseDto<null>> {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    await this.experienceRepository.softRemove(experience);

    return {
      success: true,
      message: 'Experience deleted successfully',
      data: null,
    };
  }

  async getHtmlContent(id: string): Promise<string | null> {
    const experience = await this.experienceRepository.findOne({ where: { id } });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    const content = await this.contentRepository.findOne({
      where: { learningExperienceId: id },
    });

    return content?.htmlContent ?? null;
  }

  private async hasHtml(id: string): Promise<boolean> {
    const count = await this.contentRepository.count({
      where: { learningExperienceId: id },
    });
    return count > 0;
  }

  private async buildHasHtmlMap(ids: string[]): Promise<Map<string, boolean>> {
    const hasHtmlMap = new Map<string, boolean>();
    if (ids.length === 0) {
      return hasHtmlMap;
    }

    const rows: { learning_experience_id: string }[] = await this.contentRepository.query(
      `SELECT learning_experience_id
       FROM learning_experience_content
       WHERE learning_experience_id = ANY($1::uuid[])
         AND deleted_at IS NULL`,
      [ids],
    );

    for (const id of ids) {
      hasHtmlMap.set(id, false);
    }
    for (const row of rows) {
      hasHtmlMap.set(row.learning_experience_id, true);
    }

    return hasHtmlMap;
  }
}
