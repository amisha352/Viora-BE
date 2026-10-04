import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { ExperiencesService } from '../services/experiences.service';
import {
  CreateLearningExperienceDto,
  UpdateLearningExperienceDto,
  LearningExperienceQueryDto,
  LearningExperienceResponseDto,
  LearningExperienceHtmlContentDto,
} from '../dto/learning-experience.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Experiences')
@ApiBearerAuth('access-token')
@Controller({ path: 'experiences', version: '1' })
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  @ApiOperation({ summary: 'List experiences with pagination' })
  findAll(
    @Query() query: LearningExperienceQueryDto,
  ): Promise<PaginatedResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.findAll(query);
  }

  @Get('concept/:conceptId')
  @ApiOperation({ summary: 'Get all experiences for a concept' })
  findByConceptId(
    @Param('conceptId') conceptId: string,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto[]>> {
    return this.experiencesService.findByConceptId(conceptId);
  }

  @Get('concept/:conceptId/content')
  @ApiOperation({ summary: 'Get HTML content for every experience in a concept' })
  findContentByConceptId(
    @Param('conceptId') conceptId: string,
  ): Promise<ApiResponseDto<LearningExperienceHtmlContentDto[]>> {
    return this.experiencesService.findContentByConceptId(conceptId);
  }

  @Get(':id/content')
  @ApiOperation({ summary: 'Get raw HTML content of an interactive experience' })
  async getContent(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const html = await this.experiencesService.getHtmlContent(id);
    if (html === null) {
      res.status(404).send('No HTML content');
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.send(html);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get experience by ID' })
  findOne(@Param('id') id: string): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create experience' })
  create(
    @Body() dto: CreateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update experience' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLearningExperienceDto,
  ): Promise<ApiResponseDto<LearningExperienceResponseDto>> {
    return this.experiencesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete experience' })
  remove(@Param('id') id: string): Promise<ApiResponseDto<null>> {
    return this.experiencesService.remove(id);
  }
}
