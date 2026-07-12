import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { LearningExperience } from '../entities/learning-experience.entity';
import { LearningExperienceQueryDto } from '../dto/learning-experience.dto';
import { ILearningExperienceRepository } from '../interfaces/learning-experience-repository.interface';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class LearningExperienceRepository
  extends BaseRepository<LearningExperience>
  implements ILearningExperienceRepository
{
  constructor(
    @InjectRepository(LearningExperience)
    repository: Repository<LearningExperience>,
  ) {
    super(repository);
  }

  findByConcept(conceptId: string): Promise<LearningExperience[]> {
    return this.repository.find({
      where: { conceptId },
      order: { order: 'ASC' },
    });
  }

  findByRendererKey(rendererKey: string): Promise<LearningExperience[]> {
    return this.repository.find({ where: { rendererKey } });
  }

  async findPaginated(
    query: LearningExperienceQueryDto,
  ): Promise<PaginatedResult<LearningExperience>> {
    const qb = this.repository.createQueryBuilder('experience');

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

    this.applyPagination(qb, query, 'experience');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
