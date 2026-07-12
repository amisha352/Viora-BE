import {
  Entity,
  Column,
  Index,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from './role.entity';

@Entity('permissions')
@Index(['slug'], { unique: true })
@Index(['resource', 'action'], { unique: true })
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 100 })
  resource: string;

  @Column({ type: 'varchar', length: 50 })
  action: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
