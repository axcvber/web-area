import { UsersService } from './../users/users.service';
import { AuthService } from './../auth/auth.service';
import { RequestWithUser } from './../auth/auth.controller';
import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import { EmailConfirmService } from './emailConfirmation.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmController {
  constructor(
    private readonly emailConfirmService: EmailConfirmService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('confirm')
  async confirm(
    @Body() confirmationData: ConfirmEmailDto,
    @Req() request: any,
  ) {
    const email = await this.emailConfirmService.decodeConfirmationToken(
      confirmationData.token,
    );
    const user = await this.emailConfirmService.confirmEmail(email);

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @HttpCode(200)
  @Post('resend-confirm-link')
  async resendConfirmationLink(@Body() data: { email: string }) {
    await this.emailConfirmService.resendConfirmationLink(data.email);
  }
}
