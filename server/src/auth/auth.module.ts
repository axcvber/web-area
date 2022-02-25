import { TwitterStrategy } from './strategies/twitter.strategy';
import { EmailModule } from './../email/email.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { EmailConfirmationModule } from 'src/emailConfirmation/emailConfirmation.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    EmailConfirmationModule,
    EmailModule,
    forwardRef(() => EmailConfirmationModule),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TwitterStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
