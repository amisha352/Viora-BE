import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConceptsService } from '../services/concepts.service';
import {
  CreateConceptDto,
  UpdateConceptDto,
  ConceptQueryDto,
  ConceptResponseDto,
  MoveConceptDto,
} from '../dto/concept.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Concepts')
@ApiBearerAuth('access-token')
@Controller({ path: 'concepts', version: '1' })
export class ConceptsController {
  constructor(private readonly conceptsService: ConceptsService) {}

  findAll(_query: ConceptQueryDto): Promise<PaginatedResponseDto<ConceptResponseDto>> {
    return this.conceptsService.findAll(_query);
  }

  findTree(_subjectId: string): Promise<ApiResponseDto<ConceptResponseDto[]>> {
    return this.conceptsService.findTree(_subjectId);
  }

  findOne(_id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.findOne(_id);
  }

  create(_dto: CreateConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.create(_dto);
  }

  update(_id: string, _dto: UpdateConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.update(_id, _dto);
  }

  move(_id: string, _dto: MoveConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.move(_id, _dto);
  }

  publish(_id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.publish(_id);
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    return this.conceptsService.remove(_id);
  }
}
