import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Concept } from '../../concepts/entities/concept.entity';
import { LearningExperience } from '../../experiences/entities/learning-experience.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { Assessment } from '../../assessments/entities/assessment.entity';
import { ProgressType, ProgressStatus } from '../enums/progress.enum';

@Entity('progress')
@Index(['userId'])
@Index(['conceptId'])
@Index(['learningExperienceId'])
@Index(['activityId'])
@Index(['assessmentId'])
@Index(['userId', 'type'])
@Index(['userId', 'learningExperienceId'], { unique: true, where: '"deleted_at" IS NULL AND "learning_experience_id" IS NOT NULL' })
@Index(['userId', 'activityId'], { unique: true, where: '"deleted_at" IS NULL AND "activity_id" IS NOT NULL' })
@Index(['userId', 'assessmentId'], { unique: true, where: '"deleted_at" IS NULL AND "assessment_id" IS NOT NULL' })
export class Progress extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'concept_id', nullable: true })
  conceptId: string | null;

  @Column({ type: 'uuid', name: 'learning_experience_id', nullable: true })
  learningExperienceId: string | null;

  @Column({ type: 'uuid', name: 'activity_id', nullable: true })
  activityId: string | null;

  @Column({ type: 'uuid', name: 'assessment_id', nullable: true })
  assessmentId: string | null;

  @Column({ type: 'enum', enum: ProgressType })
  type: ProgressType;

  @Column({
    type: 'enum',
    enum: ProgressStatus,
    default: ProgressStatus.NOT_STARTED,
    name: 'progress_status',
  })
  progressStatus: ProgressStatus;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  score: number | null;

  @Column({ type: 'decimal', precision: 7, scale: 2, name: 'max_score', nullable: true })
  maxScore: number | null;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @Column({ type: 'int', name: 'time_spent_seconds', default: 0 })
  timeSpentSeconds: number;

  @Column({ type: 'jsonb', name: 'simulation_state', nullable: true })
  simulationState: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  bookmark: Record<string, unknown> | null;

  @Column({ type: 'jsonb', name: 'last_position', nullable: true })
  lastPosition: Record<string, unknown> | null;

  @Column({ type: 'jsonb', name: 'completed_activities', nullable: true })
  completedActivities: string[] | null;

  @Column({ type: 'timestamptz', name: 'started_at', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamptz', name: 'completed_at', nullable: true })
  completedAt: Date | null;

  @ManyToOne(() => User, (user) => user.progressRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Concept, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'concept_id' })
  concept: Concept | null;

  @ManyToOne(() => LearningExperience, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'learning_experience_id' })
  learningExperience: LearningExperience | null;

  @ManyToOne(() => Activity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'activity_id' })
  activity: Activity | null;

  @ManyToOne(() => Assessment, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assessment_id' })
  assessment: Assessment | null;
}
