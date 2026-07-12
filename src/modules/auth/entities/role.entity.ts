import {
  Entity,
  Column,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Permission } from './permission.entity';
import { User } from '../../users/entities/user.entity';
import { RoleSlug } from '../enums/role-slug.enum';

@Entity('roles')
@Index(['slug'], { unique: true })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: RoleSlug, unique: true })
  slug: RoleSlug;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
