import { ConfigService } from '@nestjs/config';
import { UsersService } from './../users/users.service';
import { User } from '../users/entities/user.entity';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { google, Auth } from 'googleapis';
import EmailService from '../email/email.service';

interface TokenPayload {
  userId: number;
}
@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //google

  async getGoogleUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async getCookiesForGoogleUser(user: User) {
    const accessTokenCookie = this.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }

  async handleRegisterGoogleUser(user: User) {
    console.log('USER', user);

    // if (!user.isRegisteredWithGoogle) {
    //   throw new ConflictException('This email already registered');
    // }

    const { accessTokenCookie, refreshTokenCookie } =
      await this.getCookiesForGoogleUser(user);

    return {
      accessTokenCookie,
      refreshTokenCookie,
      user,
    };
  }

  async registerWithGoogle(token: string, email: string) {
    const { name, picture } = await this.getGoogleUserData(token);

    const user = await this.usersService.createWithGoogle(email, name, picture);

    return this.handleRegisterGoogleUser(user);
  }

  async authWithGoogle(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.usersService.getByEmail(email);

      return this.handleRegisterGoogleUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerWithGoogle(token, email);
    }
  }

  async forgotPassword(email: string) {
    await this.usersService.getByEmail(email);

    const token = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_RESET_PASSWORD_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_RESET_PASSWORD_TOKEN_EXPIRATION_TIME',
        )}s`,
      },
    );

    const url = `${this.configService.get(
      'RESET_PASSWORD_URL',
    )}?token=${token}`;

    const text = `Welcome to the application. To reset the password, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Reset password',
      text,
    });
  }

  async decodeResetPasswordToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_RESET_PASSWORD_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
