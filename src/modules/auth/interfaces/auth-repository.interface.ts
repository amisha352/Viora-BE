import { RefreshToken } from '../entities/refresh-token.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { AuditLog } from '../entities/audit-log.entity';

export interface IRefreshTokenRepository {
  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
  findActiveByUserId(userId: string): Promise<RefreshToken[]>;
  revoke(id: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}

export interface IRoleRepository {
  findBySlug(slug: string): Promise<Role | null>;
  findAllWithPermissions(): Promise<Role[]>;
}

export interface IPermissionRepository {
  findBySlug(slug: string): Promise<Permission | null>;
  findByResource(resource: string): Promise<Permission[]>;
}

export interface IAuditLogRepository {
  createLog(log: Partial<AuditLog>): Promise<AuditLog>;
  findByResource(resource: string, resourceId: string): Promise<AuditLog[]>;
}

export const REFRESH_TOKEN_REPOSITORY = Symbol('REFRESH_TOKEN_REPOSITORY');
export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');
export const PERMISSION_REPOSITORY = Symbol('PERMISSION_REPOSITORY');
export const AUDIT_LOG_REPOSITORY = Symbol('AUDIT_LOG_REPOSITORY');
