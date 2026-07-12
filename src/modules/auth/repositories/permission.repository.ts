import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Permission } from '../entities/permission.entity';
import { IPermissionRepository } from '../interfaces/auth-repository.interface';

@Injectable()
export class PermissionRepository
  extends BaseRepository<Permission>
  implements IPermissionRepository
{
  constructor(@InjectRepository(Permission) repository: Repository<Permission>) {
    super(repository);
  }

  findBySlug(slug: string): Promise<Permission | null> {
    return this.repository.findOne({ where: { slug } });
  }

  findByResource(resource: string): Promise<Permission[]> {
    return this.repository.find({ where: { resource } });
  }
}
