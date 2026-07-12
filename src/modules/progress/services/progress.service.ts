import { Injectable } from '@nestjs/common';
import {
  CreateProgressDto,
  UpdateProgressDto,
  ProgressQueryDto,
  ProgressResponseDto,
} from '../dto/progress.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class ProgressService {
  findAll(_query: ProgressQueryDto): Promise<PaginatedResponseDto<ProgressResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<ProgressResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateProgressDto): Promise<ApiResponseDto<ProgressResponseDto>> {
    throw new Error('Not implemented');
  }

  update(_id: string, _dto: UpdateProgressDto): Promise<ApiResponseDto<ProgressResponseDto>> {
    throw new Error('Not implemented');
  }
}
