import { EditProfileDto } from './dto/edit-profile.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async markEmailAsConfirmed(email: string) {
    await this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
    return this.getByEmail(email);
  }

  //google
  async createWithGoogle(email: string, name: string, avatar: string) {
    const newUser = await this.usersRepository.create({
      email,
      fullName: name,
      username: name.replace(/ /g, '_').toLowerCase(),
      avatar,
      isRegisteredWithGoogle: true,
      isEmailConfirmed: true,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async changePassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.getByEmail(email);
      await this.usersRepository.update(
        { email },
        {
          password: hashedPassword,
        },
      );
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editProfile(id: number, dto: EditProfileDto) {
    const user = await this.getById(id);
    const newData = Object.assign(user, {
      id,
      fullName: dto.fullName,
      username: dto.username,
      bio: dto.bio,
      location: dto.location,
      website: dto.website,
    });
    console.log('newData', newData);

    return this.usersRepository.save(newData);
  }

  //   try {
  //     const user = await this.getByEmail(email);
  //     await this.usersRepository.update(
  //       { email },
  //       {
  //         password: hashedPassword,
  //       },
  //     );
  //     user.password = undefined;
  //     return user;
  //   } catch (error) {
  //     throw new HttpException(
  //       'Something went wrong',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
