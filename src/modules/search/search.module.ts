import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { SEARCH_PROVIDER } from './interfaces/search-provider.interface';

@Module({
  controllers: [SearchController],
  providers: [
    SearchService,
    {
      provide: SEARCH_PROVIDER,
      useValue: null,
    },
  ],
  exports: [SearchService, SEARCH_PROVIDER],
})
export class SearchModule {}
