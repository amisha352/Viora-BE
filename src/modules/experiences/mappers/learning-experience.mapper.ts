import { LearningExperience } from '../entities/learning-experience.entity';
import { LearningExperienceResponseDto } from '../dto/learning-experience.dto';

export class LearningExperienceMapper {
  static toResponse(entity: LearningExperience): LearningExperienceResponseDto {
    return {
      id: entity.id,
      conceptId: entity.conceptId,
      title: entity.title,
      slug: entity.slug,
      type: entity.type,
      rendererKey: entity.rendererKey,
      configuration: entity.configuration,
      contentVersion: entity.contentVersion,
      order: entity.order,
      status: entity.status,
    };
  }

  static toResponseList(entities: LearningExperience[]): LearningExperienceResponseDto[] {
    return entities.map(LearningExperienceMapper.toResponse);
  }
}
