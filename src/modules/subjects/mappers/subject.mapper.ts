import { Subject } from '../entities/subject.entity';
import { SubjectResponseDto } from '../dto/subject.dto';

export class SubjectMapper {
  static toResponse(entity: Subject): SubjectResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      order: entity.order,
      status: entity.status,
      createdAt: entity.createdAt,
    };
  }

  static toResponseList(entities: Subject[]): SubjectResponseDto[] {
    return entities.map(SubjectMapper.toResponse);
  }
}
