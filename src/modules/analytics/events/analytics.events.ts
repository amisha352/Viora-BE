import { DomainEvent } from '../../../common/events/domain-event.interface';

export const ANALYTICS_EVENTS = {
  EVENT_RECORDED: 'analytics.event.recorded',
} as const;

export interface AnalyticsEventRecorded extends DomainEvent {
  eventType: typeof ANALYTICS_EVENTS.EVENT_RECORDED;
  payload: {
    sourceEventType: string;
    sourceAggregateId: string;
    metrics: Record<string, unknown>;
  };
}

export type AnalyticsDomainEvent = AnalyticsEventRecorded;
