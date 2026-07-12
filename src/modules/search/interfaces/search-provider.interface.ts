import { DomainEvent } from '../../../common/events/domain-event.interface';

export const SEARCH_EVENTS = {
  INDEX_REQUESTED: 'search.index.requested',
  INDEX_COMPLETED: 'search.index.completed',
} as const;

export interface SearchIndexRequestedEvent extends DomainEvent {
  eventType: typeof SEARCH_EVENTS.INDEX_REQUESTED;
  payload: {
    entityType: string;
    entityId: string;
    operation: 'create' | 'update' | 'delete';
  };
}

export interface SearchIndexCompletedEvent extends DomainEvent {
  eventType: typeof SEARCH_EVENTS.INDEX_COMPLETED;
  payload: { entityType: string; entityId: string; success: boolean };
}

export type SearchDomainEvent = SearchIndexRequestedEvent | SearchIndexCompletedEvent;

export interface SearchResult<T = Record<string, unknown>> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  facets?: Record<string, unknown>;
}

export interface SearchProvider {
  search<T>(index: string, query: SearchQuery): Promise<SearchResult<T>>;
  index(index: string, id: string, document: Record<string, unknown>): Promise<void>;
  remove(index: string, id: string): Promise<void>;
}

export interface SearchQuery {
  q?: string;
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
  sort?: { field: string; order: 'asc' | 'desc' }[];
}

export const SEARCH_PROVIDER = Symbol('SEARCH_PROVIDER');
