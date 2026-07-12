import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  data?: T;

  @ApiPropertyOptional()
  meta?: Record<string, unknown>;

  static ok<T>(data: T, message = 'Success'): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.success = true;
    response.message = message;
    response.data = data;
    return response;
  }

  static error(message: string, meta?: Record<string, unknown>): ApiResponseDto<null> {
    const response = new ApiResponseDto<null>();
    response.success = false;
    response.message = message;
    response.meta = meta;
    return response;
  }
}

export class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
  @ApiProperty()
  pagination: import('./pagination-meta.dto').PaginationMetaDto;

  static paginated<T>(
    data: T[],
    pagination: import('./pagination-meta.dto').PaginationMetaDto,
    message = 'Success',
  ): PaginatedResponseDto<T> {
    const response = new PaginatedResponseDto<T>();
    response.success = true;
    response.message = message;
    response.data = data;
    response.pagination = pagination;
    return response;
  }
}
