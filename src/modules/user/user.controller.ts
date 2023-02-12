import { Body, Controller, Get, Param, Request, Put, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '@src/decorators/api-common-response.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get all users success',
  })
  @ApiCommonResponse()
  getUsers() {
    return this.service.getUsers();
  }

  @Get('me')
  @ApiOkResponse({
    status: 200,
    description: 'Get all users success',
  })
  @ApiCommonResponse()
  getCurrentUserInfo(@Request() request: any) {
    return this.service.getCurrentUserInfo(request.user.id);
  }

  @Put('me/avatar')
  @ApiOkResponse({
    status: 200,
    description: 'Get all users success',
  })
  @ApiCommonResponse()
  updateCurrentUserAvatar(@Body() body: { photoId: string }, @Request() request: any) {
    return this.service.updateCurrentUserAvatar({
      userId: request.user.id,
      photoId: body.photoId,
    });
  }

  @Post()
  @ApiOkResponse({
    status: 200,
    description: 'Get all users success',
  })
  @ApiCommonResponse()
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
  @ApiOkResponse({
    status: 200,
    description: 'Get all users success',
  })
  @ApiCommonResponse()
  updateUserAvatar(@Body() body: { photoUrl: string; photoId: string }, @Request() request: any) {
    return this.service.updateUserAvatar({
      ...body,
      userId: request.user.id,
      uid: request.user.uid,
    });
  }

  @Put('update-role')
  @ApiOkResponse({
    status: 200,
    description: 'Get all users success',
  })
  @ApiCommonResponse()
  updateUserRole(@Body() body: { userId: number; roleId: number }) {
    return this.service.updateUserRole({
      ...body,
    });
  }
}
