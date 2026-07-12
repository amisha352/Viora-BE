import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Concept } from '../entities/concept.entity';
import { ConceptQueryDto } from '../dto/concept.dto';
import { IConceptRepository } from '../interfaces/concept-repository.interface';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class ConceptRepository
  extends BaseRepository<Concept>
  implements IConceptRepository
{
  private readonly treeRepository: TreeRepository<Concept>;

  constructor(@InjectRepository(Concept) repository: Repository<Concept>) {
    super(repository);
    this.treeRepository = repository.manager.getTreeRepository(Concept);
  }

  findBySlug(subjectId: string, slug: string): Promise<Concept | null> {
    return this.repository.findOne({ where: { subjectId, slug } });
  }

  findTreeBySubject(subjectId: string): Promise<Concept[]> {
    return this.treeRepository.findTrees({
      relations: ['children'],
    }).then((trees) =>
      trees.filter((c) => c.subjectId === subjectId),
    );
  }

  findChildren(parentId: string): Promise<Concept[]> {
    return this.repository.find({
      where: { parentId },
      order: { order: 'ASC' },
    });
  }

  async findPaginated(query: ConceptQueryDto): Promise<PaginatedResult<Concept>> {
    const qb = this.repository.createQueryBuilder('concept');

    if (query.subjectId) {
      qb.andWhere('concept.subjectId = :subjectId', { subjectId: query.subjectId });
    }

    if (query.parentId !== undefined) {
      qb.andWhere('concept.parentId = :parentId', { parentId: query.parentId });
    }

    if (query.search) {
      qb.andWhere('concept.title ILIKE :search', { search: `%${query.search}%` });
    }

    this.applyPagination(qb, query, 'concept');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
