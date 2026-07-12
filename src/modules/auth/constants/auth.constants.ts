import { SetMetadata } from '@nestjs/common';
import { RoleSlug } from '../enums/role-slug.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleSlug[]) => SetMetadata(ROLES_KEY, roles);

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
