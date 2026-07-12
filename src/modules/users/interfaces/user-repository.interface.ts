import { User } from '../entities/user.entity';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
// import { PaginatedResult } from '../interfaces/user-repository.interface';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByIdWithRoles(id: string): Promise<User | null>;
  findPaginated(query: PaginationQueryDto): Promise<PaginatedResult<User>>;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
