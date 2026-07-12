import { LearningExperience } from '../entities/learning-experience.entity';
import { LearningExperienceQueryDto } from '../dto/learning-experience.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface ILearningExperienceRepository {
  findByConcept(conceptId: string): Promise<LearningExperience[]>;
  findByRendererKey(rendererKey: string): Promise<LearningExperience[]>;
  findPaginated(query: LearningExperienceQueryDto): Promise<PaginatedResult<LearningExperience>>;
}

export const LEARNING_EXPERIENCE_REPOSITORY = Symbol('LEARNING_EXPERIENCE_REPOSITORY');
