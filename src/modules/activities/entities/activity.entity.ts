import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { LearningExperience } from '../../experiences/entities/learning-experience.entity';
import { ActivityType } from '../enums/activity-type.enum';

@Entity('activities')
@Index(['learningExperienceId'])
@Index(['type'])
@Index(['learningExperienceId', 'order'])
export class Activity extends BaseEntity {
  @Column({ type: 'uuid', name: 'learning_experience_id' })
  learningExperienceId: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ActivityType })
  type: ActivityType;

  @Column({ type: 'jsonb', default: {} })
  configuration: Record<string, unknown>;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'int', name: 'max_attempts', nullable: true })
  maxAttempts: number | null;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ type: 'int', name: 'duration_seconds', nullable: true })
  durationSeconds: number | null;

  @Column({ type: 'boolean', name: 'is_required', default: true })
  isRequired: boolean;

  @ManyToOne(() => LearningExperience, (experience) => experience.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learning_experience_id' })
  learningExperience: LearningExperience;
}
