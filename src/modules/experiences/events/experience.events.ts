import { DomainEvent } from '../../../common/events/domain-event.interface';

export const EXPERIENCE_EVENTS = {
  EXPERIENCE_CREATED: 'experiences.experience.created',
  EXPERIENCE_UPDATED: 'experiences.experience.updated',
  EXPERIENCE_PUBLISHED: 'experiences.experience.published',
} as const;

export interface ExperienceCreatedEvent extends DomainEvent {
  eventType: typeof EXPERIENCE_EVENTS.EXPERIENCE_CREATED;
  payload: {
    experienceId: string;
    conceptId: string;
    type: string;
    rendererKey: string;
  };
}

export interface ExperienceUpdatedEvent extends DomainEvent {
  eventType: typeof EXPERIENCE_EVENTS.EXPERIENCE_UPDATED;
  payload: { experienceId: string; conceptId: string };
}

export interface ExperiencePublishedEvent extends DomainEvent {
  eventType: typeof EXPERIENCE_EVENTS.EXPERIENCE_PUBLISHED;
  payload: { experienceId: string; conceptId: string };
}

export type ExperienceDomainEvent =
  | ExperienceCreatedEvent
  | ExperienceUpdatedEvent
  | ExperiencePublishedEvent;
