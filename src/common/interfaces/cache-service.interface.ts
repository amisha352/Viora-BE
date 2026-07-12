export interface CacheOptions {
  ttl?: number;
}

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
  del(key: string): Promise<void>;
  delByPattern(pattern: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}

export const CACHE_SERVICE = Symbol('CACHE_SERVICE');
