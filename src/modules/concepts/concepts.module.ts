import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept } from './entities/concept.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { ConceptsController } from './controllers/concepts.controller';
import { ConceptsService } from './services/concepts.service';
import { ConceptRepository } from './repositories/concept.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Concept, Subject])],
  controllers: [ConceptsController],
  providers: [ConceptsService, ConceptRepository],
  exports: [ConceptsService, ConceptRepository],
})
export class ConceptsModule {}
