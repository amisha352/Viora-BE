import { Assessment } from '../entities/assessment.entity';
import { Question } from '../entities/question.entity';
import { AssessmentResponseDto, QuestionResponseDto } from '../dto/assessment.dto';

export class AssessmentMapper {
  static toResponse(entity: Assessment): AssessmentResponseDto {
    return {
      id: entity.id,
      conceptId: entity.conceptId,
      title: entity.title,
      passingScore: Number(entity.passingScore),
      totalPoints: entity.totalPoints,
      status: entity.status,
    };
  }

  static questionToResponse(entity: Question): QuestionResponseDto {
    return {
      id: entity.id,
      assessmentId: entity.assessmentId,
      type: entity.type,
      content: entity.content,
      points: entity.points,
      order: entity.order,
    };
  }
}
