import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { ConceptsModule } from './modules/concepts/concepts.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { ProgressModule } from './modules/progress/progress.module';
import { AssetsModule } from './modules/assets/assets.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    SubjectsModule,
    ConceptsModule,
    ExperiencesModule,
    ActivitiesModule,
    AssessmentsModule,
    ProgressModule,
    AssetsModule,
    AnalyticsModule,
    SearchModule,
  ],
})
export class AppModule {}
