import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ActivitiesService } from '../services/activities.service';
import {
  CreateActivityDto,
  UpdateActivityDto,
  ActivityQueryDto,
  ActivityResponseDto,
} from '../dto/activity.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Activities')
@ApiBearerAuth('access-token')
@Controller({ path: 'activities', version: '1' })
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  findAll(_query: ActivityQueryDto): Promise<PaginatedResponseDto<ActivityResponseDto>> {
    return this.activitiesService.findAll(_query);
  }

  findOne(_id: string): Promise<ApiResponseDto<ActivityResponseDto>> {
    return this.activitiesService.findOne(_id);
  }

  create(_dto: CreateActivityDto): Promise<ApiResponseDto<ActivityResponseDto>> {
    return this.activitiesService.create(_dto);
  }

  update(_id: string, _dto: UpdateActivityDto): Promise<ApiResponseDto<ActivityResponseDto>> {
    return this.activitiesService.update(_id, _dto);
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    return this.activitiesService.remove(_id);
  }
}
