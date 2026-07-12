import { Injectable } from '@nestjs/common';
import {
  CreateSubjectDto,
  UpdateSubjectDto,
  SubjectQueryDto,
  SubjectResponseDto,
} from '../dto/subject.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class SubjectsService {
  findAll(_query: SubjectQueryDto): Promise<PaginatedResponseDto<SubjectResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<SubjectResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateSubjectDto): Promise<ApiResponseDto<SubjectResponseDto>> {
    throw new Error('Not implemented');
  }

  update(_id: string, _dto: UpdateSubjectDto): Promise<ApiResponseDto<SubjectResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
