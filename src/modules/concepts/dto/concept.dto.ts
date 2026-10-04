import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
  Min,
  ValidateIf,
} from 'class-validator';
import { EntityStatus } from '../../../common/enums/entity-status.enum';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class CreateConceptDto {
  @ApiProperty()
  @IsUUID()
  subjectId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentId?: string;

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

export class UpdateConceptDto extends PartialType(CreateConceptDto) {
  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;
}

export class ConceptResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subjectId: string;

  @ApiPropertyOptional()
  parentId: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  depth: number;

  @ApiProperty()
  order: number;

  @ApiProperty({ enum: EntityStatus })
  status: EntityStatus;

  @ApiPropertyOptional({ type: () => ConceptResponseDto, isArray: true })
  children?: ConceptResponseDto[];
}

export class ConceptQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiPropertyOptional({ enum: EntityStatus })
  @IsOptional()
  status?: EntityStatus;

  @ApiPropertyOptional({ description: 'Include child concepts in tree' })
  @IsOptional()
  includeChildren?: boolean;
}

export class MoveConceptDto {
  @ApiPropertyOptional({ nullable: true, description: 'New parent ID, or null to move to root' })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  newParentId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  newOrder?: number;
}
