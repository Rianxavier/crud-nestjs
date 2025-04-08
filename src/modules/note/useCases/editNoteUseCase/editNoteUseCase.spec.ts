import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EditNoteUseCase } from './editNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const titleChanged = 'Title Changed';
    const descriptionChaged = 'Description Changed';

    await editNoteUseCase.execute({
      title: titleChanged,
      description: descriptionChaged,
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChaged,
    );
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(async () => {
      await editNoteUseCase.execute({
        title: 'Qualquer titulo',
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrowError(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({ userId: '123123' });

    noteRepositoryInMemory.notes = [note];

    await expect(async () => {
      await editNoteUseCase.execute({
        title: 'Qualquer titulo',
        noteId: note.id,
        userId: 'fakeId',
      });
    }).rejects.toThrowError(UnauthorizedException);
  });
});
