import { Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { IncorrectValuesException } from 'src/exceptions/IncorrectValuesException';
import { mapperClassValidationErrorToAppException } from 'src/utils/mappers';
import { SignInBody } from '../dtos/SignInBody';

@Injectable()
export class SignInDTOValidadeMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.email;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
