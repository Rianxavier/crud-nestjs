import { Injectable } from '@nestjs/common';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermissionException';
import { NoteRepository } from '../../repositories/noteRepository';

interface EditNoteRequest {
  title: string;
  description?: string;
  userId: string;
  noteId: string;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, userId, description, noteId }: EditNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId)
      throw new NoteWithoutPermissionException({ actionName: 'editar' });

    note.title = title;
    note.description = description ?? null;

    await this.noteRepository.save(note);

    return note;
  }
}
