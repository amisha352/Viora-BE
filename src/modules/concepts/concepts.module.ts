import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept } from './entities/concept.entity';
import { ConceptsController } from './controllers/concepts.controller';
import { ConceptsService } from './services/concepts.service';
import { ConceptRepository } from './repositories/concept.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Concept])],
  controllers: [ConceptsController],
  providers: [ConceptsService, ConceptRepository],
  exports: [ConceptsService, ConceptRepository],
})
export class ConceptsModule {}
