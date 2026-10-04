import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Concept } from '../../concepts/entities/concept.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { LearningExperienceType } from '../enums/learning-experience-type.enum';
import { LearningExperienceContent } from './learning-experience-content.entity';

@Entity('learning_experiences')
@Index(['conceptId'])
@Index(['type'])
@Index(['rendererKey'])
@Index(['conceptId', 'order'])
@Index(['slug', 'conceptId'], { unique: true, where: '"deleted_at" IS NULL' })
export class LearningExperience extends BaseEntity {
  @Column({ type: 'uuid', name: 'concept_id' })
  conceptId: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: LearningExperienceType,nullable: true })
  type: LearningExperienceType;

  @Column({ type: 'varchar', length: 100, name: 'renderer_key' })
  rendererKey: string;

  @Column({ type: 'jsonb', default: {} })
  configuration: Record<string, unknown>;

  @Column({ type: 'varchar', length: 20, name: 'content_version', default: '1.0.0' })
  contentVersion: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'int', name: 'estimated_duration_minutes', nullable: true })
  estimatedDurationMinutes: number | null;

  @ManyToOne(() => Concept, (concept) => concept.learningExperiences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'concept_id' })
  concept: Concept;

  @OneToMany(() => Activity, (activity) => activity.learningExperience)
  activities: Activity[];

  @OneToOne(() => LearningExperienceContent, (content) => content.learningExperience, {
    cascade: true,
  })
  content: LearningExperienceContent;
}
