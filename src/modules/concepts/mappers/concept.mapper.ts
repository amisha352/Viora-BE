import { Concept } from '../entities/concept.entity';
import { ConceptResponseDto } from '../dto/concept.dto';

export class ConceptMapper {
  static toResponse(entity: Concept, includeChildren = false): ConceptResponseDto {
    const dto: ConceptResponseDto = {
      id: entity.id,
      subjectId: entity.subjectId,
      parentId: entity.parentId,
      title: entity.title,
      slug: entity.slug,
      depth: entity.depth,
      order: entity.order,
      status: entity.status,
    };

    if (includeChildren && entity.children?.length) {
      dto.children = entity.children.map((c) => ConceptMapper.toResponse(c, true));
    }

    return dto;
  }

  static toResponseList(entities: Concept[]): ConceptResponseDto[] {
    return entities.map((e) => ConceptMapper.toResponse(e));
  }
}
