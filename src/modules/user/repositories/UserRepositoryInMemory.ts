import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class UserRespositoryInMemory implements UserRepository {
  public users: User[] = [];

  create(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
