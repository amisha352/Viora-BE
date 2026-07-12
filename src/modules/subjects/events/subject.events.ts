import { DomainEvent } from '../../../common/events/domain-event.interface';

export const SUBJECT_EVENTS = {
  SUBJECT_CREATED: 'subjects.subject.created',
  SUBJECT_UPDATED: 'subjects.subject.updated',
  SUBJECT_PUBLISHED: 'subjects.subject.published',
} as const;

export interface SubjectCreatedEvent extends DomainEvent {
  eventType: typeof SUBJECT_EVENTS.SUBJECT_CREATED;
  payload: { subjectId: string; slug: string };
}

export interface SubjectUpdatedEvent extends DomainEvent {
  eventType: typeof SUBJECT_EVENTS.SUBJECT_UPDATED;
  payload: { subjectId: string };
}

export interface SubjectPublishedEvent extends DomainEvent {
  eventType: typeof SUBJECT_EVENTS.SUBJECT_PUBLISHED;
  payload: { subjectId: string };
}

export type SubjectDomainEvent =
  | SubjectCreatedEvent
  | SubjectUpdatedEvent
  | SubjectPublishedEvent;
