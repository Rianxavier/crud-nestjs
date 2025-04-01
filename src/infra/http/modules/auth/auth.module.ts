import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}
