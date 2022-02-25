import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-twitter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly configService: ConfigService) {
    super({
      consumerKey: configService.get('TWITTER_CONSUMER_KEY'),
      consumerSecret: configService.get('TWITTER_CONSUMER_SECRET'),
      callbackURL: 'http://localhost:5000/api/auth/twitter-auth-redirect',
      scope: ['email', 'profile'],
    });
  }

  // async validate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: any,
  //   done: VerifyCallback,
  // ): Promise<any> {
  //   const { name, emails, photos } = profile;
  //   const user = {
  //     email: emails[0].value,
  //     firstName: name.givenName,
  //     lastName: name.familyName,
  //     picture: photos[0].value,
  //     accessToken,
  //   };
  //   done(null, user);
  // }

  async validate(
    accessToken: string,
    refreshToken: string,
    user: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('USER validate', user);
    done(null, user);
  }
}
