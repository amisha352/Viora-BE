import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
@Index(['userId'])
@Index(['resource', 'resourceId'])
@Index(['action'])
@Index(['createdAt'])
export class AuditLog extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id', nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', length: 100 })
  action: string;

  @Column({ type: 'varchar', length: 100 })
  resource: string;

  @Column({ type: 'uuid', name: 'resource_id', nullable: true })
  resourceId: string | null;

  @Column({ type: 'jsonb', name: 'old_value', nullable: true })
  oldValue: Record<string, unknown> | null;

  @Column({ type: 'jsonb', name: 'new_value', nullable: true })
  newValue: Record<string, unknown> | null;

  @Column({ type: 'varchar', length: 45, name: 'ip_address', nullable: true })
  ipAddress: string | null;

  @Column({ type: 'varchar', length: 500, name: 'user_agent', nullable: true })
  userAgent: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @ManyToOne(() => User, (user) => user.auditLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User | null;
}
