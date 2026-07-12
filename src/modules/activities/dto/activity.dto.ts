import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
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
import { ActivityType } from '../enums/activity-type.enum';

export class CreateActivityDto {
  @ApiProperty()
  @IsUUID()
  learningExperienceId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ActivityType })
  @IsEnum(ActivityType)
  type: ActivityType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  configuration?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttempts?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;
}

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}

export class ActivityResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  learningExperienceId: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: ActivityType })
  type: ActivityType;

  @ApiProperty()
  configuration: Record<string, unknown>;

  @ApiProperty()
  order: number;

  @ApiProperty()
  points: number;

  @ApiProperty({ enum: EntityStatus })
  status: EntityStatus;
}

export class ActivityQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  learningExperienceId?: string;

  @ApiPropertyOptional({ enum: ActivityType })
  @IsOptional()
  @IsEnum(ActivityType)
  type?: ActivityType;
}
