import { Injectable } from '@nestjs/common';
import { AnalyticsQueryDto, AnalyticsSummaryDto } from '../dto/analytics.dto';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class AnalyticsService {
  getSummary(_query: AnalyticsQueryDto): Promise<ApiResponseDto<AnalyticsSummaryDto>> {
    throw new Error('Not implemented');
  }
}
