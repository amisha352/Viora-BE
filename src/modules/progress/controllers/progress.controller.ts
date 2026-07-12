import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressService } from '../services/progress.service';
import {
  CreateProgressDto,
  UpdateProgressDto,
  ProgressQueryDto,
  ProgressResponseDto,
} from '../dto/progress.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Progress')
@ApiBearerAuth('access-token')
@Controller({ path: 'progress', version: '1' })
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  findAll(_query: ProgressQueryDto): Promise<PaginatedResponseDto<ProgressResponseDto>> {
    return this.progressService.findAll(_query);
  }

  findOne(_id: string): Promise<ApiResponseDto<ProgressResponseDto>> {
    return this.progressService.findOne(_id);
  }

  create(_dto: CreateProgressDto): Promise<ApiResponseDto<ProgressResponseDto>> {
    return this.progressService.create(_dto);
  }

  update(_id: string, _dto: UpdateProgressDto): Promise<ApiResponseDto<ProgressResponseDto>> {
    return this.progressService.update(_id, _dto);
  }
}
