import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AssessmentsService {
  findAll(_query: AssessmentQueryDto): Promise<PaginatedResponseDto<AssessmentResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<AssessmentResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateAssessmentDto): Promise<ApiResponseDto<AssessmentResponseDto>> {
    throw new Error('Not implemented');
  }

  update(
    _id: string,
    _dto: UpdateAssessmentDto,
  ): Promise<ApiResponseDto<AssessmentResponseDto>> {
    throw new Error('Not implemented');
  }

  addQuestion(_dto: CreateQuestionDto): Promise<ApiResponseDto<QuestionResponseDto>> {
    throw new Error('Not implemented');
  }

  updateQuestion(
    _id: string,
    _dto: UpdateQuestionDto,
  ): Promise<ApiResponseDto<QuestionResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
