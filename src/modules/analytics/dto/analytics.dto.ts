import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsDateString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class AnalyticsQueryDto extends PaginationQueryDto {
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
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  toDate?: string;
}

export class AnalyticsSummaryDto {
  @ApiPropertyOptional()
  totalUsers: number;

  @ApiPropertyOptional()
  activeUsers: number;

  @ApiPropertyOptional()
  completedActivities: number;

  @ApiPropertyOptional()
  averageScore: number;
}
