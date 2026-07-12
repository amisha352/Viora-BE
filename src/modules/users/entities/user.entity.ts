import {
  Entity,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../auth/entities/role.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { AuditLog } from '../../auth/entities/audit-log.entity';

@Entity('users')
@Index(['email'], { unique: true, where: '"deleted_at" IS NULL' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash', select: false })
  passwordHash: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', length: 100, name: 'last_name', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', length: 200, name: 'display_name', nullable: true })
  displayName: string | null;

  @Column({ type: 'varchar', length: 500, name: 'avatar_url', nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'boolean', name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ type: 'timestamptz', name: 'last_login_at', nullable: true })
  lastLoginAt: Date | null;

  @ManyToMany(() => Role, (role) => role.users, { eager: false })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Progress, (progress) => progress.user)
  progressRecords: Progress[];

  @OneToMany(() => AuditLog, (log) => log.user)
  auditLogs: AuditLog[];
}
