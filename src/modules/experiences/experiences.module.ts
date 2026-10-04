import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningExperience } from './entities/learning-experience.entity';
import { LearningExperienceContent } from './entities/learning-experience-content.entity';
import { Concept } from '../concepts/entities/concept.entity';
import { ExperiencesController } from './controllers/experiences.controller';
import { ExperiencesService } from './services/experiences.service';
import { LearningExperienceRepository } from './repositories/learning-experience.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LearningExperience, LearningExperienceContent, Concept])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService, LearningExperienceRepository],
  exports: [ExperiencesService, LearningExperienceRepository],
})
export class ExperiencesModule {}
