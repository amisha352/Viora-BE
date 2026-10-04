import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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

  @Get()
  @ApiOperation({ summary: 'List concepts with pagination' })
  findAll(@Query() query: ConceptQueryDto): Promise<PaginatedResponseDto<ConceptResponseDto>> {
    return this.conceptsService.findAll(query);
  }

  @Get('tree/:subjectId')
  @ApiOperation({ summary: 'Get concept tree for a subject' })
  findTree(@Param('subjectId') subjectId: string): Promise<ApiResponseDto<ConceptResponseDto[]>> {
    return this.conceptsService.findTree(subjectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get concept by ID' })
  findOne(@Param('id') id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create concept' })
  create(@Body() dto: CreateConceptDto): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update concept' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateConceptDto,
  ): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.update(id, dto);
  }

  @Post(':id/move')
  @ApiOperation({ summary: 'Move concept in the tree' })
  move(
    @Param('id') id: string,
    @Body() dto: MoveConceptDto,
  ): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.move(id, dto);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish concept' })
  publish(@Param('id') id: string): Promise<ApiResponseDto<ConceptResponseDto>> {
    return this.conceptsService.publish(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete concept' })
  remove(@Param('id') id: string): Promise<ApiResponseDto<null>> {
    return this.conceptsService.remove(id);
  }
}
