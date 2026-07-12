import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { AssetType } from '../enums/asset-type.enum';

@Entity('assets')
@Index(['type'])
@Index(['storageKey'], { unique: true })
@Index(['uploadedById'])
@Index(['mimeType'])
export class Asset extends BaseEntity {
  @Column({ type: 'enum', enum: AssetType })
  type: AssetType;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 255, name: 'original_filename' })
  originalFilename: string;

  @Column({ type: 'varchar', length: 127, name: 'mime_type' })
  mimeType: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'varchar', length: 500, name: 'storage_key' })
  storageKey: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  url: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  checksum: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column({ type: 'uuid', name: 'uploaded_by_id', nullable: true })
  uploadedById: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'uploaded_by_id' })
  uploadedBy: User | null;
}
