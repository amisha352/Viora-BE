import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsController } from './controllers/subjects.controller';
import { SubjectsService } from './services/subjects.service';
import { SubjectRepository } from './repositories/subject.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectRepository],
  exports: [SubjectsService, SubjectRepository],
})
export class SubjectsModule {}
