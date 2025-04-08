import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Fazer CRUD',
      userId: 'fakeId',
      description: 'Fazendo CRUD nest',
      ...override,
    },
    id,
  );
};
