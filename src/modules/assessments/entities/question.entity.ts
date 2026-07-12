import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Assessment } from './assessment.entity';
import { QuestionType } from '../enums/question-type.enum';

@Entity('questions')
@Index(['assessmentId'])
@Index(['type'])
@Index(['assessmentId', 'order'])
export class Question extends BaseEntity {
  @Column({ type: 'uuid', name: 'assessment_id' })
  assessmentId: string;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @Column({ type: 'jsonb' })
  content: Record<string, unknown>;

  @Column({ type: 'jsonb', name: 'correct_answer', nullable: true })
  correctAnswer: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  explanation: Record<string, unknown> | null;

  @Column({ type: 'int', default: 1 })
  points: number;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @ManyToOne(() => Assessment, (assessment) => assessment.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assessment_id' })
  assessment: Assessment;
}
