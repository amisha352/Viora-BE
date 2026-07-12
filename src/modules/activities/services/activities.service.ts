import { Injectable } from '@nestjs/common';
import {
  CreateActivityDto,
  UpdateActivityDto,
  ActivityQueryDto,
  ActivityResponseDto,
} from '../dto/activity.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class ActivitiesService {
  findAll(_query: ActivityQueryDto): Promise<PaginatedResponseDto<ActivityResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<ActivityResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateActivityDto): Promise<ApiResponseDto<ActivityResponseDto>> {
    throw new Error('Not implemented');
  }

  update(_id: string, _dto: UpdateActivityDto): Promise<ApiResponseDto<ActivityResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
