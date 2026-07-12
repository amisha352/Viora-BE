import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Activity } from '../entities/activity.entity';
import { ActivityQueryDto } from '../dto/activity.dto';
import { IActivityRepository } from '../interfaces/activity-repository.interface';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class ActivityRepository
  extends BaseRepository<Activity>
  implements IActivityRepository
{
  constructor(@InjectRepository(Activity) repository: Repository<Activity>) {
    super(repository);
  }

  findByExperience(learningExperienceId: string): Promise<Activity[]> {
    return this.repository.find({
      where: { learningExperienceId },
      order: { order: 'ASC' },
    });
  }

  async findPaginated(query: ActivityQueryDto): Promise<PaginatedResult<Activity>> {
    const qb = this.repository.createQueryBuilder('activity');

    if (query.learningExperienceId) {
      qb.andWhere('activity.learningExperienceId = :id', {
        id: query.learningExperienceId,
      });
    }

    if (query.type) {
      qb.andWhere('activity.type = :type', { type: query.type });
    }

    this.applyPagination(qb, query, 'activity');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
