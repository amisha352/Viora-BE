import { Activity } from '../entities/activity.entity';
import { ActivityResponseDto } from '../dto/activity.dto';

export class ActivityMapper {
  static toResponse(entity: Activity): ActivityResponseDto {
    return {
      id: entity.id,
      learningExperienceId: entity.learningExperienceId,
      title: entity.title,
      type: entity.type,
      configuration: entity.configuration,
      order: entity.order,
      points: entity.points,
      status: entity.status,
    };
  }

  static toResponseList(entities: Activity[]): ActivityResponseDto[] {
    return entities.map(ActivityMapper.toResponse);
  }
}
