import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export enum SearchEntityType {
  SUBJECT = 'subject',
  CONCEPT = 'concept',
  EXPERIENCE = 'experience',
  ACTIVITY = 'activity',
  ASSESSMENT = 'assessment',
}

export class GlobalSearchQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Search query' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: SearchEntityType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(SearchEntityType, { each: true })
  entityTypes?: SearchEntityType[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subjectId?: string;
}

export class SearchResultItemDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  entityType: SearchEntityType;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  slug: string;

  @ApiPropertyOptional()
  highlight?: string;

  @ApiPropertyOptional()
  score?: number;
}
