import { Body, Controller, Get, Param, Request, Put, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  @Get('me')
  getCurrentUserInfo(@Request() request: any) {
    return this.service.getCurrentUserInfo(request.user.id);
  }

  @Put('me/avatar')
  updateCurrentUserAvatar(@Body() body: { photoId: string }, @Request() request: any) {
    return this.service.updateCurrentUserAvatar({
      userId: request.user.id,
      photoId: body.photoId,
    });
  }

  @Post()
  createUser(
    @Body()
    body: {
      email: string;
      password: string;
      phoneNumber: string;
      displayName: string;
      roleId: number;
    },
  ) {
    return this.service.createUser({
      ...body,
    });
  }

  @Put('avatar')
  updateUserAvatar(@Body() body: { photoUrl: string; photoId: string }, @Request() request: any) {
    return this.service.updateUserAvatar({
      ...body,
      userId: request.user.id,
      uid: request.user.uid,
    });
  }

  @Put('update-role')
  updateUserRole(@Body() body: { userId: number; roleId: number }) {
    return this.service.updateUserRole({
      ...body,
    });
  }
}
