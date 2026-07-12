import { Repository, FindOptionsWhere, FindManyOptions, ObjectLiteral } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { PaginationMetaDto } from '../dto/pagination-meta.dto';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async count(where?: FindOptionsWhere<T>): Promise<number> {
    return this.repository.count({ where });
  }

  protected buildPaginationMeta(
    total: number,
    query: PaginationQueryDto,
  ): PaginationMetaDto {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  protected applyPagination<E extends ObjectLiteral>(
    queryBuilder: import('typeorm').SelectQueryBuilder<E>,
    pagination: PaginationQueryDto,
    alias: string,
  ): import('typeorm').SelectQueryBuilder<E> {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 20;
    const skip = (page - 1) * limit;

    if (pagination.sortBy) {
      queryBuilder.orderBy(
        `${alias}.${pagination.sortBy}`,
        pagination.sortOrder ?? 'ASC',
      );
    }

    return queryBuilder.skip(skip).take(limit);
  }
}
