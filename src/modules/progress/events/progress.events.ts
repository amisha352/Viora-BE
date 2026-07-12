import { DomainEvent } from '../../../common/events/domain-event.interface';

export const PROGRESS_EVENTS = {
  PROGRESS_STARTED: 'progress.started',
  PROGRESS_UPDATED: 'progress.updated',
  PROGRESS_COMPLETED: 'progress.completed',
} as const;

export interface ProgressStartedEvent extends DomainEvent {
  eventType: typeof PROGRESS_EVENTS.PROGRESS_STARTED;
  payload: { progressId: string; userId: string; type: string };
}

export interface ProgressUpdatedEvent extends DomainEvent {
  eventType: typeof PROGRESS_EVENTS.PROGRESS_UPDATED;
  payload: {
    progressId: string;
    userId: string;
    changes: Record<string, unknown>;
  };
}

export interface ProgressCompletedEvent extends DomainEvent {
  eventType: typeof PROGRESS_EVENTS.PROGRESS_COMPLETED;
  payload: { progressId: string; userId: string; score: number | null };
}

export type ProgressDomainEvent =
  | ProgressStartedEvent
  | ProgressUpdatedEvent
  | ProgressCompletedEvent;
