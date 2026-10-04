import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { LearningExperience } from './learning-experience.entity';

@Entity('learning_experience_content')
@Index('idx_lec_experience', ['learningExperienceId'], { unique: true })
export class LearningExperienceContent extends BaseEntity {
  @Column({ type: 'uuid', name: 'learning_experience_id' })
  learningExperienceId: string;

  @Column({ type: 'text', name: 'html_content', nullable: true })
  htmlContent: string | null;

  @OneToOne(() => LearningExperience, (experience) => experience.content, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learning_experience_id' })
  learningExperience: LearningExperience;
}
