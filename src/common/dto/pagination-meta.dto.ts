import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiPropertyOptional()
  totalPages?: number;

  @ApiPropertyOptional()
  hasNextPage?: boolean;

  @ApiPropertyOptional()
  hasPreviousPage?: boolean;
}
