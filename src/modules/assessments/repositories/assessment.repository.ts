import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Assessment } from '../entities/assessment.entity';
import { Question } from '../entities/question.entity';
import {
  IAssessmentRepository,
  IQuestionRepository,
} from '../interfaces/assessment-repository.interface';
import { AssessmentQueryDto } from '../dto/assessment.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class AssessmentRepository
  extends BaseRepository<Assessment>
  implements IAssessmentRepository
{
  constructor(@InjectRepository(Assessment) repository: Repository<Assessment>) {
    super(repository);
  }

  findByConcept(conceptId: string): Promise<Assessment[]> {
    return this.repository.find({
      where: { conceptId },
      order: { order: 'ASC' },
    });
  }

  async findPaginated(query: AssessmentQueryDto): Promise<PaginatedResult<Assessment>> {
    const qb = this.repository.createQueryBuilder('assessment');

    if (query.conceptId) {
      qb.andWhere('assessment.conceptId = :conceptId', { conceptId: query.conceptId });
    }

    this.applyPagination(qb, query, 'assessment');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}

@Injectable()
export class QuestionRepository
  extends BaseRepository<Question>
  implements IQuestionRepository
{
  constructor(@InjectRepository(Question) repository: Repository<Question>) {
    super(repository);
  }

  findByAssessment(assessmentId: string): Promise<Question[]> {
    return this.repository.find({
      where: { assessmentId },
      order: { order: 'ASC' },
    });
  }
}
