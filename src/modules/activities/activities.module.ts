import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ActivitiesController } from './controllers/activities.controller';
import { ActivitiesService } from './services/activities.service';
import { ActivityRepository } from './repositories/activity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivityRepository],
  exports: [ActivitiesService, ActivityRepository],
})
export class ActivitiesModule {}
