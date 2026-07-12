import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SubjectsService } from '../services/subjects.service';
import {
  CreateSubjectDto,
  UpdateSubjectDto,
  SubjectQueryDto,
  SubjectResponseDto,
} from '../dto/subject.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Subjects')
@ApiBearerAuth('access-token')
@Controller({ path: 'subjects', version: '1' })
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List subjects with pagination' })
  findAll(@Query() query: SubjectQueryDto): Promise<PaginatedResponseDto<SubjectResponseDto>> {
    return this.subjectsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subject by ID' })
  findOne(@Param('id') id: string): Promise<ApiResponseDto<SubjectResponseDto>> {
    return this.subjectsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create subject' })
  create(@Body() dto: CreateSubjectDto): Promise<ApiResponseDto<SubjectResponseDto>> {
    return this.subjectsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subject' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSubjectDto,
  ): Promise<ApiResponseDto<SubjectResponseDto>> {
    return this.subjectsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete subject' })
  remove(@Param('id') id: string): Promise<ApiResponseDto<null>> {
    return this.subjectsService.remove(id);
  }
}
