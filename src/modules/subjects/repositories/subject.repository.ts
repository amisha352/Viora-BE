import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Subject } from '../entities/subject.entity';
import { SubjectQueryDto } from '../dto/subject.dto';
import { ISubjectRepository } from '../interfaces/subject-repository.interface';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class SubjectRepository
  extends BaseRepository<Subject>
  implements ISubjectRepository
{
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }

  findBySlug(slug: string): Promise<Subject | null> {
    return this.repository.findOne({ where: { slug } });
  }

  async findPaginated(query: SubjectQueryDto): Promise<PaginatedResult<Subject>> {
    const qb = this.repository.createQueryBuilder('subject');

    if (query.search) {
      qb.andWhere('(subject.name ILIKE :search OR subject.slug ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    if (query.status) {
      qb.andWhere('subject.status = :status', { status: query.status });
    }

    this.applyPagination(qb, query, 'subject');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
