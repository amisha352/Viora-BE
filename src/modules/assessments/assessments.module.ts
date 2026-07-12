import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './entities/assessment.entity';
import { Question } from './entities/question.entity';
import { AssessmentsController } from './controllers/assessments.controller';
import { AssessmentsService } from './services/assessments.service';
import { AssessmentRepository, QuestionRepository } from './repositories/assessment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Question])],
  controllers: [AssessmentsController],
  providers: [AssessmentsService, AssessmentRepository, QuestionRepository],
  exports: [AssessmentsService, AssessmentRepository, QuestionRepository],
})
export class AssessmentsModule {}
