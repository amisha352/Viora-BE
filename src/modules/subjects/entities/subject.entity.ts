import {
  Entity,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Concept } from '../../concepts/entities/concept.entity';

@Entity('subjects')
@Index(['slug'], { unique: true, where: '"deleted_at" IS NULL' })
@Index(['order'])
export class Subject extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 500, name: 'icon_url', nullable: true })
  iconUrl: string | null;

  @Column({ type: 'varchar', length: 500, name: 'cover_url', nullable: true })
  coverUrl: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @OneToMany(() => Concept, (concept) => concept.subject)
  concepts: Concept[];
}
