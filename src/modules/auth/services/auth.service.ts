import { Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../dto/auth.dto';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';

@Injectable()
export class AuthService {
  register(_dto: RegisterDto): Promise<ApiResponseDto<unknown>> {
    throw new Error('Not implemented');
  }

  login(_dto: LoginDto): Promise<ApiResponseDto<unknown>> {
    throw new Error('Not implemented');
  }

  refresh(_dto: RefreshTokenDto): Promise<ApiResponseDto<unknown>> {
    throw new Error('Not implemented');
  }

  logout(_userId: string): Promise<ApiResponseDto<null>> {
    throw new Error('Not implemented');
  }
}
