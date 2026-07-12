import { Assessment } from '../entities/assessment.entity';
import { Question } from '../entities/question.entity';
import { AssessmentQueryDto } from '../dto/assessment.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface IAssessmentRepository {
  findByConcept(conceptId: string): Promise<Assessment[]>;
  findPaginated(query: AssessmentQueryDto): Promise<PaginatedResult<Assessment>>;
}

export interface IQuestionRepository {
  findByAssessment(assessmentId: string): Promise<Question[]>;
}

export const ASSESSMENT_REPOSITORY = Symbol('ASSESSMENT_REPOSITORY');
export const QUESTION_REPOSITORY = Symbol('QUESTION_REPOSITORY');
