import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { ProgressController } from './controllers/progress.controller';
import { ProgressService } from './services/progress.service';
import { ProgressRepository } from './repositories/progress.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressRepository],
  exports: [ProgressService, ProgressRepository],
})
export class ProgressModule {}
