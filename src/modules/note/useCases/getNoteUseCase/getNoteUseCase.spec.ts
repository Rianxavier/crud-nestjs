import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetNoteUseCase } from './getNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      userId: user.id,
      noteId: note.id,
    });

    expect(result).toEqual(note);
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(async () => {
      await getNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrowError(NoteNotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({ userId: '123123' });

    noteRepositoryInMemory.notes = [note];

    await expect(async () => {
      await getNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      });
    }).rejects.toThrowError(NoteWithoutPermissionException);
  });
});
