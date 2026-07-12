import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
  UserResponseDto,
} from '../dto/user.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  findAll(_query: UserQueryDto): Promise<PaginatedResponseDto<UserResponseDto>> {
    return this.usersService.findAll(_query);
  }

  findOne(_id: string): Promise<ApiResponseDto<UserResponseDto>> {
    return this.usersService.findOne(_id);
  }

  create(_dto: CreateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    return this.usersService.create(_dto);
  }

  update(_id: string, _dto: UpdateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    return this.usersService.update(_id, _dto);
  }

  remove(_id: string): Promise<ApiResponseDto<null>> {
    return this.usersService.remove(_id);
  }
}
