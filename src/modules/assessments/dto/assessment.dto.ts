import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
  Min,
} from 'class-validator';
import { EntityStatus } from '../../../common/enums/entity-status.enum';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { QuestionType } from '../enums/question-type.enum';

export class CreateAssessmentDto {
  @ApiProperty()
  @IsUUID()
  conceptId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  configuration?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  passingScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  timeLimitSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  maxAttempts?: number;
}

export class UpdateAssessmentDto extends PartialType(CreateAssessmentDto) {
  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsUUID()
  assessmentId: string;

  @ApiProperty({ enum: QuestionType })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty()
  @IsObject()
  content: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  correctAnswer?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  points?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}

export class AssessmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  conceptId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  passingScore: number;

  @ApiProperty()
  totalPoints: number;

  @ApiProperty({ enum: EntityStatus })
  status: EntityStatus;
}

export class QuestionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  assessmentId: string;

  @ApiProperty({ enum: QuestionType })
  type: QuestionType;

  @ApiProperty()
  content: Record<string, unknown>;

  @ApiProperty()
  points: number;

  @ApiProperty()
  order: number;
}

export class AssessmentQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  conceptId?: string;
}
