import { DomainEvent } from '../../../common/events/domain-event.interface';

export const ASSESSMENT_EVENTS = {
  ASSESSMENT_CREATED: 'assessments.assessment.created',
  ASSESSMENT_UPDATED: 'assessments.assessment.updated',
  ASSESSMENT_FINISHED: 'assessments.assessment.finished',
  QUESTION_ADDED: 'assessments.question.added',
} as const;

export interface AssessmentCreatedEvent extends DomainEvent {
  eventType: typeof ASSESSMENT_EVENTS.ASSESSMENT_CREATED;
  payload: { assessmentId: string; conceptId: string };
}

export interface AssessmentUpdatedEvent extends DomainEvent {
  eventType: typeof ASSESSMENT_EVENTS.ASSESSMENT_UPDATED;
  payload: { assessmentId: string };
}

export interface AssessmentFinishedEvent extends DomainEvent {
  eventType: typeof ASSESSMENT_EVENTS.ASSESSMENT_FINISHED;
  payload: {
    userId: string;
    assessmentId: string;
    score: number;
    passed: boolean;
  };
}

export interface QuestionAddedEvent extends DomainEvent {
  eventType: typeof ASSESSMENT_EVENTS.QUESTION_ADDED;
  payload: { questionId: string; assessmentId: string; type: string };
}

export type AssessmentDomainEvent =
  | AssessmentCreatedEvent
  | AssessmentUpdatedEvent
  | AssessmentFinishedEvent
  | QuestionAddedEvent;
