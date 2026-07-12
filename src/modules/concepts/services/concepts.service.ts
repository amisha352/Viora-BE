import { Injectable } from '@nestjs/common';
import {
  CreateConceptDto,
  UpdateConceptDto,
  ConceptQueryDto,
  ConceptResponseDto,
  MoveConceptDto,
} from '../dto/concept.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class ConceptsService {
  findAll(_query: ConceptQueryDto): Promise<PaginatedResponseDto<ConceptResponseDto>> {
    throw new Error('Not implemented');
  }

  findTree(_subjectId: string): Promise<ApiResponseDto<ConceptResponseDto[]>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    throw new Error('Not implemented');
  }

  update(_id: string, _dto: UpdateConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    throw new Error('Not implemented');
  }

  move(_id: string, _dto: MoveConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    throw new Error('Not implemented');
  }

  publish(_id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
