import { AuthModule } from './../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { EmailConfirmService } from './emailConfirmation.service';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmController } from './emailConfirmation.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    EmailModule,
    JwtModule.register({}),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  providers: [EmailConfirmService],
  exports: [EmailConfirmService],
  controllers: [EmailConfirmController],
})
export class EmailConfirmationModule {}
