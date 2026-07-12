import { Concept } from '../entities/concept.entity';
import { ConceptQueryDto } from '../dto/concept.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface IConceptRepository {
  findBySlug(subjectId: string, slug: string): Promise<Concept | null>;
  findTreeBySubject(subjectId: string): Promise<Concept[]>;
  findChildren(parentId: string): Promise<Concept[]>;
  findPaginated(query: ConceptQueryDto): Promise<PaginatedResult<Concept>>;
}

export const CONCEPT_REPOSITORY = Symbol('CONCEPT_REPOSITORY');
