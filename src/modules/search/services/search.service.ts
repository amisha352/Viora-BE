import { Injectable } from '@nestjs/common';
import { GlobalSearchQueryDto, SearchResultItemDto } from '../dto/search.dto';
import { PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class SearchService {
  search(_query: GlobalSearchQueryDto): Promise<PaginatedResponseDto<SearchResultItemDto>> {
    throw new Error('Not implemented');
  }
}
