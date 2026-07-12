import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from '../services/search.service';
import { GlobalSearchQueryDto, SearchResultItemDto } from '../dto/search.dto';
import { PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Search')
@ApiBearerAuth('access-token')
@Controller({ path: 'search', version: '1' })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  search(_query: GlobalSearchQueryDto): Promise<PaginatedResponseDto<SearchResultItemDto>> {
    return this.searchService.search(_query);
  }
}
