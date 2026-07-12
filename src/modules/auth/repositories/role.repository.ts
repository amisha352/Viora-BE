import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Role } from '../entities/role.entity';
import { IRoleRepository } from '../interfaces/auth-repository.interface';

@Injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
  constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository);
  }

  findBySlug(slug: string): Promise<Role | null> {
    return this.repository.findOne({ where: { slug: slug as Role['slug'] } });
  }

  findAllWithPermissions(): Promise<Role[]> {
    return this.repository.find({ relations: ['permissions'] });
  }
}
