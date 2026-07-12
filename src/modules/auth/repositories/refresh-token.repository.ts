import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { RefreshToken } from '../entities/refresh-token.entity';
import { IRefreshTokenRepository } from '../interfaces/auth-repository.interface';

@Injectable()
export class RefreshTokenRepository
  extends BaseRepository<RefreshToken>
  implements IRefreshTokenRepository
{
  constructor(
    @InjectRepository(RefreshToken)
    repository: Repository<RefreshToken>,
  ) {
    super(repository);
  }

  findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return this.repository.findOne({ where: { tokenHash } });
  }

  findActiveByUserId(userId: string): Promise<RefreshToken[]> {
    return this.repository.find({
      where: { userId, revokedAt: null as unknown as Date },
    });
  }

  async revoke(id: string): Promise<void> {
    await this.repository.update(id, { revokedAt: new Date() });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.repository.update(
      { userId, revokedAt: null as unknown as Date },
      { revokedAt: new Date() },
    );
  }
}
