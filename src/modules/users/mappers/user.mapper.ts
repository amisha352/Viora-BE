import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user.dto';

export class UserMapper {
  static toResponse(entity: User): UserResponseDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      displayName: entity.displayName,
      emailVerified: entity.emailVerified,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toResponseList(entities: User[]): UserResponseDto[] {
    return entities.map(UserMapper.toResponse);
  }
}
