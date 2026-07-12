import { DomainEvent } from '../../../common/events/domain-event.interface';

export const AUTH_EVENTS = {
  USER_REGISTERED: 'auth.user.registered',
  USER_LOGGED_IN: 'auth.user.logged_in',
  TOKEN_REFRESHED: 'auth.token.refreshed',
  TOKEN_REVOKED: 'auth.token.revoked',
} as const;

export interface UserRegisteredEvent extends DomainEvent {
  eventType: typeof AUTH_EVENTS.USER_REGISTERED;
  payload: {
    userId: string;
    email: string;
  };
}

export interface UserLoggedInEvent extends DomainEvent {
  eventType: typeof AUTH_EVENTS.USER_LOGGED_IN;
  payload: {
    userId: string;
    ipAddress: string | null;
  };
}

export interface TokenRefreshedEvent extends DomainEvent {
  eventType: typeof AUTH_EVENTS.TOKEN_REFRESHED;
  payload: {
    userId: string;
    tokenId: string;
  };
}

export interface TokenRevokedEvent extends DomainEvent {
  eventType: typeof AUTH_EVENTS.TOKEN_REVOKED;
  payload: {
    userId: string;
    tokenId: string;
  };
}

export type AuthDomainEvent =
  | UserRegisteredEvent
  | UserLoggedInEvent
  | TokenRefreshedEvent
  | TokenRevokedEvent;
