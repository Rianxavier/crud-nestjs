import { compare } from 'bcrypt';
import { UserRespositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRespositoryInMemory: UserRespositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRespositoryInMemory = new UserRespositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRespositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRespositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Rian',
      password: '123123',
    });

    expect(userRespositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Rian',
      password: userPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});
