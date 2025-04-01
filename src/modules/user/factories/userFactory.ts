import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@gmail.com',
      name: 'Rian',
      password: '1231123',
      ...override,
    },
    id,
  );
};
