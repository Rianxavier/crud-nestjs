import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateNoteBody } from './dtos/CreateNoteBody';
import { NoteViewModel } from './viewModel/NoteViewModel';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { EditNoteBody } from './dtos/EditNoteBody';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { description, title } = body;

    const note = await this.createNoteUseCase.execute({
      title,
      userId: request.user.id,
      description,
    });

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
    @Body() body: EditNoteBody,
  ) {
    const { description, title } = body;

    await this.editNoteUseCase.execute({
      noteId,
      title,
      userId: request.user.id,
      description,
    });
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }
}
