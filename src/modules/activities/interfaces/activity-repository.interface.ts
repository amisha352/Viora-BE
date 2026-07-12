import { Activity } from '../entities/activity.entity';
import { ActivityQueryDto } from '../dto/activity.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface IActivityRepository {
  findByExperience(learningExperienceId: string): Promise<Activity[]>;
  findPaginated(query: ActivityQueryDto): Promise<PaginatedResult<Activity>>;
}

export const ACTIVITY_REPOSITORY = Symbol('ACTIVITY_REPOSITORY');
