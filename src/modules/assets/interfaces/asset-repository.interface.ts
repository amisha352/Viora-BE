import { Asset } from '../entities/asset.entity';
import { AssetQueryDto } from '../dto/asset.dto';
import { PaginatedResult } from '../../users/interfaces/user-repository.interface';

export interface IAssetRepository {
  findByStorageKey(storageKey: string): Promise<Asset | null>;
  findPaginated(query: AssetQueryDto): Promise<PaginatedResult<Asset>>;
}

export const ASSET_REPOSITORY = Symbol('ASSET_REPOSITORY');
