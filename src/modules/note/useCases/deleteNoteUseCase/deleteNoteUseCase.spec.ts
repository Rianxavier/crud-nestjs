import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrowError(NoteNotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: note.id,
        userId: '213123',
      });
    }).rejects.toThrowError(NoteWithoutPermissionException);
  });
});
