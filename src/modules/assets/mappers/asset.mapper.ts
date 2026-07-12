import { Asset } from '../entities/asset.entity';
import { AssetResponseDto } from '../dto/asset.dto';

export class AssetMapper {
  static toResponse(entity: Asset): AssetResponseDto {
    return {
      id: entity.id,
      type: entity.type,
      filename: entity.filename,
      originalFilename: entity.originalFilename,
      mimeType: entity.mimeType,
      size: Number(entity.size),
      storageKey: entity.storageKey,
      url: entity.url,
      createdAt: entity.createdAt,
    };
  }

  static toResponseList(entities: Asset[]): AssetResponseDto[] {
    return entities.map(AssetMapper.toResponse);
  }
}
