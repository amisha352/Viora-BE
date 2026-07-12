import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Concept } from '../../concepts/entities/concept.entity';
import { Question } from './question.entity';

@Entity('assessments')
@Index(['conceptId'])
@Index(['conceptId', 'order'])
export class Assessment extends BaseEntity {
  @Column({ type: 'uuid', name: 'concept_id' })
  conceptId: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', default: {} })
  configuration: Record<string, unknown>;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'passing_score', default: 60 })
  passingScore: number;

  @Column({ type: 'int', name: 'time_limit_seconds', nullable: true })
  timeLimitSeconds: number | null;

  @Column({ type: 'int', name: 'max_attempts', nullable: true })
  maxAttempts: number | null;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'int', name: 'total_points', default: 0 })
  totalPoints: number;

  @ManyToOne(() => Concept, (concept) => concept.assessments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'concept_id' })
  concept: Concept;

  @OneToMany(() => Question, (question) => question.assessment)
  questions: Question[];
}
