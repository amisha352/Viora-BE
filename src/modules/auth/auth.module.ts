import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuditLog } from './entities/audit-log.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { JwtStrategy } from './validators/jwt.strategy';
import { JwtAuthGuard } from './validators/jwt-auth.guard';
import { RolesGuard } from './validators/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, RefreshToken, AuditLog]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: { expiresIn: config.get<string>('jwt.accessExpiresIn') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshTokenRepository,
    RoleRepository,
    PermissionRepository,
    AuditLogRepository,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [AuthService, JwtModule, JwtAuthGuard, RolesGuard, RoleRepository],
})
export class AuthModule {}
