import { Progress } from '../entities/progress.entity';
import { ProgressQueryDto } from '../dto/progress.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface IProgressRepository {
  findByUserAndExperience(
    userId: string,
    learningExperienceId: string,
  ): Promise<Progress | null>;
  findByUser(userId: string): Promise<Progress[]>;
  findPaginated(query: ProgressQueryDto): Promise<PaginatedResult<Progress>>;
}

export const PROGRESS_REPOSITORY = Symbol('PROGRESS_REPOSITORY');
