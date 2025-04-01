import { User } from 'src/modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ createdAt, email, id, name, password }: User): UserRaw {
    return {
      createdAt,
      email,
      id,
      name,
      password,
    };
  }

  static toDomain({ id, ...userData }: UserRaw): User {
    return new User(
      {
        ...userData,
      },
      id,
    );
  }
}
