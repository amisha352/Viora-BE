import { LearningExperience } from '../entities/learning-experience.entity';
import { LearningExperienceResponseDto } from '../dto/learning-experience.dto';

export class LearningExperienceMapper {
  static toResponse(
    entity: LearningExperience,
    hasHtml = false,
  ): LearningExperienceResponseDto {
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
      hasHtml,
    };
  }

  static toResponseList(
    entities: LearningExperience[],
    hasHtmlMap?: Map<string, boolean>,
  ): LearningExperienceResponseDto[] {
    return entities.map((entity) =>
      LearningExperienceMapper.toResponse(entity, hasHtmlMap?.get(entity.id) ?? false),
    );
  }
}
