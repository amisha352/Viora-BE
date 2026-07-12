import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Progress } from '../entities/progress.entity';
import { ProgressQueryDto } from '../dto/progress.dto';
import { IProgressRepository } from '../interfaces/progress-repository.interface';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class ProgressRepository
  extends BaseRepository<Progress>
  implements IProgressRepository
{
  constructor(@InjectRepository(Progress) repository: Repository<Progress>) {
    super(repository);
  }

  findByUserAndExperience(
    userId: string,
    learningExperienceId: string,
  ): Promise<Progress | null> {
    return this.repository.findOne({ where: { userId, learningExperienceId } });
  }

  findByUser(userId: string): Promise<Progress[]> {
    return this.repository.find({ where: { userId } });
  }

  async findPaginated(query: ProgressQueryDto): Promise<PaginatedResult<Progress>> {
    const qb = this.repository.createQueryBuilder('progress');

    if (query.userId) {
      qb.andWhere('progress.userId = :userId', { userId: query.userId });
    }

    if (query.conceptId) {
      qb.andWhere('progress.conceptId = :conceptId', { conceptId: query.conceptId });
    }

    if (query.type) {
      qb.andWhere('progress.type = :type', { type: query.type });
    }

    this.applyPagination(qb, query, 'progress');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
