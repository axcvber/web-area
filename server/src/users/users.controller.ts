import { EditProfileDto } from './dto/edit-profile.dto';
import { RequestWithUser } from './../auth/auth.controller';
import { SearchUserDto } from './dto/search-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // getProfile(@Request() req) {
  //   return this.userService.findById(req.user.id);
  // }
  @UseGuards(JwtAuthGuard)
  @Patch('edit-profile')
  update(
    @Req() request: RequestWithUser,
    @Body() editProfileDto: EditProfileDto,
  ) {
    console.log('here update');
    return this.usersService.editProfile(request.user.id, editProfileDto);
  }

  // @Get('search')
  // search(@Query() dto: SearchUserDto) {
  //   return this.userService.search(dto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findById(+id);
  // }
}
