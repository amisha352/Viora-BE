import { Subject } from '../entities/subject.entity';
import { SubjectQueryDto } from '../dto/subject.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface ISubjectRepository {
  findBySlug(slug: string): Promise<Subject | null>;
  findPaginated(query: SubjectQueryDto): Promise<PaginatedResult<Subject>>;
}

export const SUBJECT_REPOSITORY = Symbol('SUBJECT_REPOSITORY');
