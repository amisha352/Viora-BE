import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subject } from '../entities/subject.entity';
import {
  CreateSubjectDto,
  UpdateSubjectDto,
  SubjectQueryDto,
  SubjectResponseDto,
} from '../dto/subject.dto';

import {
  ApiResponseDto,
  PaginatedResponseDto,
} from '../../../common/dto/api-response.dto';

import { EntityStatus } from '../../../common/enums/entity-status.enum';


@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}
  async findAll(
    query: SubjectQueryDto,
  ): Promise<PaginatedResponseDto<SubjectResponseDto>> {
  
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
  
    const qb = this.subjectRepository.createQueryBuilder('subject');
  
    if (query.status) {
      qb.andWhere('subject.status = :status', {
        status: query.status,
      });
    }
  
    qb.orderBy('subject.order', 'ASC');
  
    qb.skip((page - 1) * limit);
  
    qb.take(limit);
  
    const [items, total] = await qb.getManyAndCount();
  
    return {
      success: true,
      data: items,
      pagination: {   // ← nested object, not flat fields
        page,
        limit,
        total,
      },
      message: 'Subjects fetched successfully',
    };
  }

  async findOne(
    id: string,
  ): Promise<ApiResponseDto<SubjectResponseDto>> {
  
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
    });
  
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
  
    return {
      success: true,
      data: subject,
      message: 'Subject fetched successfully',
    };
  }

  async create(
    dto: CreateSubjectDto,
  ): Promise<ApiResponseDto<SubjectResponseDto>> {
    const exists = await this.subjectRepository.findOne({
      where: {
        slug: dto.slug,
      },
    });
  
    if (exists) {
      throw new ConflictException('Subject slug already exists');
    }
  
    const subject = this.subjectRepository.create(dto);
  
    const saved = await this.subjectRepository.save(subject);
  
    return {
      success: true,
      message: 'Subject created successfully',
      data: saved,
    };
  }

  async update(
    id: string,
    dto: UpdateSubjectDto,
  ): Promise<ApiResponseDto<SubjectResponseDto>> {
  
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
    });
  
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
  
    if (dto.slug) {
      const duplicate = await this.subjectRepository.findOne({
        where: {
          slug: dto.slug,
        },
      });
  
      if (duplicate && duplicate.id !== id) {
        throw new ConflictException('Slug already exists');
      }
    }
  
    Object.assign(subject, dto);
  
    const updated = await this.subjectRepository.save(subject);
  
    return {
      success: true,
      message: 'Subject updated successfully',
      data: updated,
    };
  }

  async remove(
    id: string,
  ): Promise<ApiResponseDto<null>> {
  
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
    });
  
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
  
    await this.subjectRepository.softRemove(subject);
  
    return {
      success: true,
      message: 'Subject deleted successfully',
      data: null,
    };
  }
}
