import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';

export class CreateUserBody {
  @IsEmailCustom()
  @IsNotEmptyCustom()
  @IsStringCustom()
  email: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @MinLengthCustom(6)
  password: string;
}
