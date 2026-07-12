import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssessmentsService } from '../services/assessments.service';
import {
  CreateAssessmentDto,
  UpdateAssessmentDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  AssessmentQueryDto,
  AssessmentResponseDto,
  QuestionResponseDto,
} from '../dto/assessment.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Assessments')
@ApiBearerAuth('access-token')
@Controller({ path: 'assessments', version: '1' })
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  findAll(_query: AssessmentQueryDto): Promise<PaginatedResponseDto<AssessmentResponseDto>> {
    return this.assessmentsService.findAll(_query);
  }

  findOne(_id: string): Promise<ApiResponseDto<AssessmentResponseDto>> {
    return this.assessmentsService.findOne(_id);
  }

  create(_dto: CreateAssessmentDto): Promise<ApiResponseDto<AssessmentResponseDto>> {
    return this.assessmentsService.create(_dto);
  }

  update(
    _id: string,
    _dto: UpdateAssessmentDto,
  ): Promise<ApiResponseDto<AssessmentResponseDto>> {
    return this.assessmentsService.update(_id, _dto);
  }

  addQuestion(_dto: CreateQuestionDto): Promise<ApiResponseDto<QuestionResponseDto>> {
    return this.assessmentsService.addQuestion(_dto);
  }

  updateQuestion(
    _id: string,
    _dto: UpdateQuestionDto,
  ): Promise<ApiResponseDto<QuestionResponseDto>> {
    return this.assessmentsService.updateQuestion(_id, _dto);
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    return this.assessmentsService.remove(_id);
  }
}
