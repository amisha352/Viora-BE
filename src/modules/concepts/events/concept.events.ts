import { DomainEvent } from '../../../common/events/domain-event.interface';

export const CONCEPT_EVENTS = {
  CONCEPT_CREATED: 'concepts.concept.created',
  CONCEPT_UPDATED: 'concepts.concept.updated',
  CONCEPT_PUBLISHED: 'concepts.concept.published',
  CONCEPT_MOVED: 'concepts.concept.moved',
} as const;

export interface ConceptCreatedEvent extends DomainEvent {
  eventType: typeof CONCEPT_EVENTS.CONCEPT_CREATED;
  payload: { conceptId: string; subjectId: string; parentId: string | null };
}

export interface ConceptUpdatedEvent extends DomainEvent {
  eventType: typeof CONCEPT_EVENTS.CONCEPT_UPDATED;
  payload: { conceptId: string };
}

export interface ConceptPublishedEvent extends DomainEvent {
  eventType: typeof CONCEPT_EVENTS.CONCEPT_PUBLISHED;
  payload: { conceptId: string; subjectId: string };
}

export interface ConceptMovedEvent extends DomainEvent {
  eventType: typeof CONCEPT_EVENTS.CONCEPT_MOVED;
  payload: { conceptId: string; oldParentId: string | null; newParentId: string | null };
}

export type ConceptDomainEvent =
  | ConceptCreatedEvent
  | ConceptUpdatedEvent
  | ConceptPublishedEvent
  | ConceptMovedEvent;
