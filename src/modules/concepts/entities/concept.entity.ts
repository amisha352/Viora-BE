import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { LearningExperience } from '../../experiences/entities/learning-experience.entity';
import { Assessment } from '../../assessments/entities/assessment.entity';

@Entity('concepts')
@Tree('materialized-path')
@Index(['subjectId'])
@Index(['parentId'])
@Index(['slug', 'subjectId'], { unique: true, where: '"deleted_at" IS NULL' })
@Index(['order'])
@Index(['depth'])
export class Concept extends BaseEntity {
  @Column({ type: 'uuid', name: 'subject_id' })
  subjectId: string;

  @Column({ type: 'uuid', name: 'parent_id', nullable: true })
  parentId: string | null;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'int', default: 0 })
  depth: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  path: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column({ type: 'timestamptz', name: 'published_at', nullable: true })
  publishedAt: Date | null;

  @ManyToOne(() => Subject, (subject) => subject.concepts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Concept | null;

  @TreeChildren()
  children: Concept[];

  @OneToMany(() => LearningExperience, (experience) => experience.concept)
  learningExperiences: LearningExperience[];

  @OneToMany(() => Assessment, (assessment) => assessment.concept)
  assessments: Assessment[];
}
