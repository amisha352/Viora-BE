import { Progress } from '../entities/progress.entity';
import { ProgressResponseDto } from '../dto/progress.dto';

export class ProgressMapper {
  static toResponse(entity: Progress): ProgressResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      type: entity.type,
      progressStatus: entity.progressStatus,
      score: entity.score !== null ? Number(entity.score) : null,
      attempts: entity.attempts,
      timeSpentSeconds: entity.timeSpentSeconds,
      simulationState: entity.simulationState,
      lastPosition: entity.lastPosition,
    };
  }

  static toResponseList(entities: Progress[]): ProgressResponseDto[] {
    return entities.map(ProgressMapper.toResponse);
  }
}
