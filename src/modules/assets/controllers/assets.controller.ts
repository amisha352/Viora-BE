import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssetsService } from '../services/assets.service';
import {
  CreateAssetDto,
  UpdateAssetDto,
  AssetQueryDto,
  AssetResponseDto,
} from '../dto/asset.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Assets')
@ApiBearerAuth('access-token')
@Controller({ path: 'assets', version: '1' })
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  findAll(_query: AssetQueryDto): Promise<PaginatedResponseDto<AssetResponseDto>> {
    return this.assetsService.findAll(_query);
  }

  findOne(_id: string): Promise<ApiResponseDto<AssetResponseDto>> {
    return this.assetsService.findOne(_id);
  }

  create(_dto: CreateAssetDto): Promise<ApiResponseDto<AssetResponseDto>> {
    return this.assetsService.create(_dto);
  }

  update(_id: string, _dto: UpdateAssetDto): Promise<ApiResponseDto<AssetResponseDto>> {
    return this.assetsService.update(_id, _dto);
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    return this.assetsService.remove(_id);
  }
}
