import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from '../services/analytics.service';
import { AnalyticsQueryDto, AnalyticsSummaryDto } from '../dto/analytics.dto';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Analytics')
@ApiBearerAuth('access-token')
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  getSummary(_query: AnalyticsQueryDto): Promise<ApiResponseDto<AnalyticsSummaryDto>> {
    return this.analyticsService.getSummary(_query);
  }
}
