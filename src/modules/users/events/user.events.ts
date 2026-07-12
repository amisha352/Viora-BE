import { DomainEvent } from '../../../common/events/domain-event.interface';

export const USER_EVENTS = {
  USER_CREATED: 'users.user.created',
  USER_UPDATED: 'users.user.updated',
  USER_DELETED: 'users.user.deleted',
} as const;

export interface UserCreatedEvent extends DomainEvent {
  eventType: typeof USER_EVENTS.USER_CREATED;
  payload: { userId: string; email: string };
}

export interface UserUpdatedEvent extends DomainEvent {
  eventType: typeof USER_EVENTS.USER_UPDATED;
  payload: { userId: string; changes: Record<string, unknown> };
}

export interface UserDeletedEvent extends DomainEvent {
  eventType: typeof USER_EVENTS.USER_DELETED;
  payload: { userId: string };
}

export type UserDomainEvent = UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent;
