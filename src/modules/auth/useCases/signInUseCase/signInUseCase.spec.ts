import { JwtService } from '@nestjs/jwt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { SignInUseCase } from './signInUseCase';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access_token', async () => {
    const user = makeUser({});

    const token = await signInUseCase.execute({ user });

    const payload = jwtService.decode(token);

    expect(payload.sub).toEqual(user.id);
  });
});
