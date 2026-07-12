import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ExperiencesService } from '../services/experiences.service';
import {
  CreateLearningExperienceDto,
  UpdateLearningExperienceDto,
  LearningExperienceQueryDto,
  LearningExperienceResponseDto,
} from '../dto/learning-experience.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Experiences')
@ApiBearerAuth('access-token')
@Controller({ path: 'experiences', version: '1' })
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  findAll(
    _query: LearningExperienceQueryDto,
  ): Promise<PaginatedResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.findAll(_query);
  }

  findOne(_id: string): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.findOne(_id);
  }

  create(
    _dto: CreateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.create(_dto);
  }

  update(
    _id: string,
    _dto: UpdateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.update(_id, _dto);
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    return this.experiencesService.remove(_id);
  }
}
