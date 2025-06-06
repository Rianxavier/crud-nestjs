import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/noteRepository';

interface getManyRequest {
  userId: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, page, perPage }: getManyRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const notes = await this.noteRepository.findManyByUserId(
      userId,
      currentPage,
      currentPerPage,
    );

    return notes;
  }
}
