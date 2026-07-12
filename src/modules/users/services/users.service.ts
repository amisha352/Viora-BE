import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
  UserResponseDto,
} from '../dto/user.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class UsersService {
  findAll(_query: UserQueryDto): Promise<PaginatedResponseDto<UserResponseDto>> {
    throw new Error('Not implemented');
  }

  findOne(_id: string): Promise<ApiResponseDto<UserResponseDto>> {
    throw new Error('Not implemented');
  }

  create(_dto: CreateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    throw new Error('Not implemented');
  }

  update(_id: string, _dto: UpdateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    throw new Error('Not implemented');
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
