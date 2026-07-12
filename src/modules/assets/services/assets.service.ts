import { Injectable } from '@nestjs/common';
import {
  CreateAssetDto,
  UpdateAssetDto,
  AssetQueryDto,
  AssetResponseDto,
} from '../dto/asset.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class AssetsService {
  findAll(_query: AssetQueryDto): Promise<PaginatedResponseDto<AssetResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<AssetResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateAssetDto): Promise<ApiResponseDto<AssetResponseDto>> {
    throw new Error('Not implemented');
  }

  update(_id: string, _dto: UpdateAssetDto): Promise<ApiResponseDto<AssetResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
