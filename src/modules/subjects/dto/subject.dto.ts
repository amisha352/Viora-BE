import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsObject, Min } from 'class-validator';
import { EntityStatus } from '../../../common/enums/entity-status.enum';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class CreateSubjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;
}

export class SubjectResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty()
  order: number;

  @ApiProperty({ enum: EntityStatus })
  status: EntityStatus;

  @ApiProperty()
  createdAt: Date;
}

export class SubjectQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;
}
