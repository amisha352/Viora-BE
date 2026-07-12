import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { User } from '../entities/user.entity';
import { IUserRepository, PaginatedResult } from '../interfaces/user-repository.interface';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  findByIdWithRoles(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id }, relations: ['roles'] });
  }

  async findPaginated(query: PaginationQueryDto): Promise<PaginatedResult<User>> {
    const qb = this.repository.createQueryBuilder('user');

    if (query.search) {
      qb.andWhere(
        '(user.email ILIKE :search OR user.displayName ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    this.applyPagination(qb, query, 'user');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
