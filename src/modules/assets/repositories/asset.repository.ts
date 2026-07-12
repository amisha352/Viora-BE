import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Asset } from '../entities/asset.entity';
import { AssetQueryDto } from '../dto/asset.dto';
import { IAssetRepository } from '../interfaces/asset-repository.interface';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

@Injectable()
export class AssetRepository extends BaseRepository<Asset> implements IAssetRepository {
  constructor(@InjectRepository(Asset) repository: Repository<Asset>) {
    super(repository);
  }

  findByStorageKey(storageKey: string): Promise<Asset | null> {
    return this.repository.findOne({ where: { storageKey } });
  }

  async findPaginated(query: AssetQueryDto): Promise<PaginatedResult<Asset>> {
    const qb = this.repository.createQueryBuilder('asset');

    if (query.type) {
      qb.andWhere('asset.type = :type', { type: query.type });
    }

    if (query.mimeType) {
      qb.andWhere('asset.mimeType = :mimeType', { mimeType: query.mimeType });
    }

    this.applyPagination(qb, query, 'asset');
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
