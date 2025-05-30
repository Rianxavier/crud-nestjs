import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const isPasswordMatched = await compare(password, user.password);

      if (isPasswordMatched) return user;
    }

    throw new AuthValuesIncorrectException();
  }
}
