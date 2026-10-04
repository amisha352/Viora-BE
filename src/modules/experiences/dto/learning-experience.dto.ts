import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
  Min,
} from 'class-validator';
import { EntityStatus } from '../../../common/enums/entity-status.enum';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { LearningExperienceType } from '../enums/learning-experience-type.enum';

export class CreateLearningExperienceDto {
  @ApiProperty()
  @IsUUID()
  conceptId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: LearningExperienceType })
  @IsEnum(LearningExperienceType)
  type: LearningExperienceType;

  @ApiProperty({ example: 'gravity_simulator' })
  @IsString()
  rendererKey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  configuration?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contentVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ description: 'Raw HTML for interactive experiences' })
  @IsOptional()
  @IsString()
  htmlContent?: string;
}

export class UpdateLearningExperienceDto extends PartialType(CreateLearningExperienceDto) {
  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;
}

export class LearningExperienceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  conceptId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ enum: LearningExperienceType })
  type: LearningExperienceType;

  @ApiProperty()
  rendererKey: string;

  @ApiProperty()
  configuration: Record<string, unknown>;

  @ApiProperty()
  contentVersion: string;

  @ApiProperty()
  order: number;

  @ApiProperty({ enum: EntityStatus })
  status: EntityStatus;

  @ApiProperty()
  hasHtml: boolean;
}

export class LearningExperienceHtmlContentDto {
  @ApiProperty()
  learningExperienceId: string;

  @ApiProperty({ nullable: true })
  htmlContent: string | null;

  @ApiProperty()
  version: number;
}

export class LearningExperienceQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  conceptId?: string;

  @ApiPropertyOptional({ enum: LearningExperienceType })
  @IsOptional()
  @IsEnum(LearningExperienceType)
  type?: LearningExperienceType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rendererKey?: string;

  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;
}
