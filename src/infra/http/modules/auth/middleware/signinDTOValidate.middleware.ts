import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dtos/SignInBody';
import { validate } from 'class-validator';

@Injectable()
export class SignInDTOValidadeMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.email;

    const validations = await validate(signInBody);

    if (validations.length) throw new BadRequestException(validations);

    next();
  }
}
