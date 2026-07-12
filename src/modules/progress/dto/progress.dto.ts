import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
  IsArray,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { ProgressType, ProgressStatus } from '../enums/progress.enum';

export class CreateProgressDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: ProgressType })
  @IsEnum(ProgressType)
  type: ProgressType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  conceptId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  learningExperienceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  activityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  assessmentId?: string;
}

export class UpdateProgressDto {
  @ApiPropertyOptional({ enum: ProgressStatus })
  @IsOptional()
  progressStatus?: ProgressStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  simulationState?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  bookmark?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  lastPosition?: Record<string, unknown>;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  completedActivities?: string[];
}

export class ProgressResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: ProgressType })
  type: ProgressType;

  @ApiProperty({ enum: ProgressStatus })
  progressStatus: ProgressStatus;

  @ApiPropertyOptional()
  score: number | null;

  @ApiProperty()
  attempts: number;

  @ApiProperty()
  timeSpentSeconds: number;

  @ApiPropertyOptional()
  simulationState: Record<string, unknown> | null;

  @ApiPropertyOptional()
  lastPosition: Record<string, unknown> | null;
}

export class ProgressQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  conceptId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  learningExperienceId?: string;

  @ApiPropertyOptional({ enum: ProgressType })
  @IsOptional()
  @IsEnum(ProgressType)
  type?: ProgressType;

  @ApiPropertyOptional({ enum: ProgressStatus })
  @IsOptional()
  progressStatus?: ProgressStatus;
}
