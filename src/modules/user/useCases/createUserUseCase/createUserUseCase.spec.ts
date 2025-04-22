import { compare } from 'bcrypt';
import { CreateUserUseCase } from './createUserUseCase';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { makeUser } from '../../factories/userFactory';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';

let createUserUseCase: CreateUserUseCase;
let userRespositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRespositoryInMemory = new UserRepositoryInMemory();
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

  it('Should be able to thorw error when create user with already exist email', async () => {
    const user = makeUser({});

    userRespositoryInMemory.users = [user];

    await expect(
      async () =>
        await createUserUseCase.execute({
          email: user.email,
          name: 'rian',
          password: '123123',
        }),
    ).rejects.toThrowError(UserWithSameEmailException);
  });
});
