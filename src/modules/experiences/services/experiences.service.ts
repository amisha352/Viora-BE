import { Injectable } from '@nestjs/common';
import {
  CreateLearningExperienceDto,
  UpdateLearningExperienceDto,
  LearningExperienceQueryDto,
  LearningExperienceResponseDto,
} from '../dto/learning-experience.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class ExperiencesService {
  findAll(
    _query: LearningExperienceQueryDto,
  ): Promise<PaginatedResponseDto<LearningExperienceResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    throw new Error('Not implemented');
  }

  create(
    _dto: CreateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    throw new Error('Not implemented');
  }

  update(
    _id: string,
    _dto: UpdateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
