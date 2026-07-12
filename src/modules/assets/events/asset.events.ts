import { DomainEvent } from '../../../common/events/domain-event.interface';

export const ASSET_EVENTS = {
  ASSET_UPLOADED: 'assets.asset.uploaded',
  ASSET_DELETED: 'assets.asset.deleted',
} as const;

export interface AssetUploadedEvent extends DomainEvent {
  eventType: typeof ASSET_EVENTS.ASSET_UPLOADED;
  payload: {
    assetId: string;
    type: string;
    storageKey: string;
    uploadedById: string | null;
  };
}

export interface AssetDeletedEvent extends DomainEvent {
  eventType: typeof ASSET_EVENTS.ASSET_DELETED;
  payload: { assetId: string; storageKey: string };
}

export type AssetDomainEvent = AssetUploadedEvent | AssetDeletedEvent;
