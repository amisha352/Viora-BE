import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { AuditLog } from '../entities/audit-log.entity';
import { IAuditLogRepository } from '../interfaces/auth-repository.interface';

@Injectable()
export class AuditLogRepository
  extends BaseRepository<AuditLog>
  implements IAuditLogRepository
{
  constructor(@InjectRepository(AuditLog) repository: Repository<AuditLog>) {
    super(repository);
  }

  async createLog(log: Partial<AuditLog>): Promise<AuditLog> {
    const entity = this.repository.create(log);
    return this.repository.save(entity);
  }

  findByResource(resource: string, resourceId: string): Promise<AuditLog[]> {
    return this.repository.find({
      where: { resource, resourceId },
      order: { createdAt: 'DESC' },
    });
  }
}
