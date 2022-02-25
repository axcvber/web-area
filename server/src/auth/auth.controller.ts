import { TwitterAuthGuard } from './guards/twitter.auth.guard';
import { GoogleTokenDto } from './dto/googleToken.dto';
import { EmailConfirmGuard } from './../emailConfirmation/guards/emailConfirm.guard';
import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { Request, Response } from 'express';
import { EmailConfirmService } from 'src/emailConfirmation/emailConfirmation.service';
import { AuthGuard } from '@nestjs/passport';

export interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private readonly emailConfirmService: EmailConfirmService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    await this.authService.register(registrationData);
    await this.emailConfirmService.sendVerificationLink(registrationData.email);
  }

  @HttpCode(200)
  @UseGuards(EmailConfirmGuard)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: any) {
    const { user } = request;
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

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // authenticate(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   user.password = undefined;
  //   return user;
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: any) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    console.log('Refresh');

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @Post('google-auth')
  async googleAuth(@Body() tokenData: GoogleTokenDto, @Req() request: Request) {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.authService.authWithGoogle(tokenData.token);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return user;
  }

  @Get('twitter-auth')
  @UseGuards(TwitterAuthGuard)
  async twitterAuth(@Req() _req: any) {
    console.log('RES', _req);

    // Guard redirects
  }

  @Get('twitter-auth-redirect')
  @UseGuards(TwitterAuthGuard)
  async twitterAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // For now, we'll just show the user object
    return req.user;
  }

  // @Get('twitter-auth')
  // @UseGuards(AuthGuard('twitter'))
  // async twitterAuth(@Req() request: Request) {
  //   console.log('TWITTER USER', request.user);
  // }

  // @Get('twitter-callback')
  // @UseGuards(AuthGuard('twitter'))
  // async twitterAuthCallback(
  //   @Req() request: Request,
  // ) {
  //   console.log('TWITTER USER', request.user);
  // }

  @HttpCode(200)
  @Post('forgot-password')
  async forgotPassword(@Body() data: { email: string }) {
    console.log(data.email);
    await this.authService.forgotPassword(data.email);
  }

  @HttpCode(200)
  @Post('check-reset-password-link')
  async checkResetPasswordLink(@Body() data: { token: string }) {
    await this.authService.decodeResetPasswordToken(data.token);
  }

  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(
    @Body() data: { email: string; password: string },
    @Req() request: any,
  ) {
    const user = await this.usersService.changePassword(
      data.email,
      data.password,
    );

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
}
