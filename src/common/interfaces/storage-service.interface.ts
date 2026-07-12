export interface UploadOptions {
  contentType: string;
  folder?: string;
  metadata?: Record<string, string>;
}

export interface StorageObject {
  key: string;
  url: string;
  size: number;
  contentType: string;
}

export interface StorageService {
  upload(key: string, buffer: Buffer, options: UploadOptions): Promise<StorageObject>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
  exists(key: string): Promise<boolean>;
}

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');
