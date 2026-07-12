import { DomainEvent } from '../../../common/events/domain-event.interface';

export const ACTIVITY_EVENTS = {
  ACTIVITY_CREATED: 'activities.activity.created',
  ACTIVITY_UPDATED: 'activities.activity.updated',
  TASK_COMPLETED: 'activities.task.completed',
} as const;

export interface ActivityCreatedEvent extends DomainEvent {
  eventType: typeof ACTIVITY_EVENTS.ACTIVITY_CREATED;
  payload: { activityId: string; learningExperienceId: string; type: string };
}

export interface ActivityUpdatedEvent extends DomainEvent {
  eventType: typeof ACTIVITY_EVENTS.ACTIVITY_UPDATED;
  payload: { activityId: string };
}

export interface TaskCompletedEvent extends DomainEvent {
  eventType: typeof ACTIVITY_EVENTS.TASK_COMPLETED;
  payload: {
    userId: string;
    activityId: string;
    learningExperienceId: string;
    score: number | null;
  };
}

export type ActivityDomainEvent =
  | ActivityCreatedEvent
  | ActivityUpdatedEvent
  | TaskCompletedEvent;
