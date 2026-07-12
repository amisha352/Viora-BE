import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../dto/auth.dto';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register(_dto: RegisterDto): Promise<ApiResponseDto<unknown>> {
    return this.authService.register(_dto);
  }

  login(_dto: LoginDto): Promise<ApiResponseDto<unknown>> {
    return this.authService.login(_dto);
  }

  refresh(_dto: RefreshTokenDto): Promise<ApiResponseDto<unknown>> {
    return this.authService.refresh(_dto);
  }

  logout(_userId: string): Promise<ApiResponseDto<null>> {
    return this.authService.logout(_userId);
  }
}
