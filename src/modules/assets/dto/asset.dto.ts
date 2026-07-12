import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsObject, IsInt, Min } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { AssetType } from '../enums/asset-type.enum';

export class CreateAssetDto {
  @ApiProperty({ enum: AssetType })
  @IsEnum(AssetType)
  type: AssetType;

  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  originalFilename: string;

  @ApiProperty()
  @IsString()
  mimeType: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  size: number;

  @ApiProperty()
  @IsString()
  storageKey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url?: string;
}

export class AssetResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: AssetType })
  type: AssetType;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  originalFilename: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  storageKey: string;

  @ApiPropertyOptional()
  url: string | null;

  @ApiProperty()
  createdAt: Date;
}

export class AssetQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: AssetType })
  @IsOptional()
  @IsEnum(AssetType)
  type?: AssetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mimeType?: string;
}
