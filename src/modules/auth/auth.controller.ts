import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Redirect } from "@nestjs/common/decorators/http/redirect.decorator";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { CustomRequest } from "@src/utils/types/request";
import { AuthService } from "./auth.service";
import {config} from '../../common/config/constants'
import { Request } from "express";

const CLIENT_URL = `http://${config.HOST}:${config.CLIENT_PORT}`;
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: Request) {}
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: CustomRequest) {
      return this.authService.googleLogin(req)
    }

    @Get('login/success')
    async loginSuccess(@Req() req: CustomRequest) {
      return this.authService.loginSuccess(req)
    }

    @Get('login/failed')
    async loginFailed() {
      throw new UnauthorizedException("failure")
    }

    @Get('logout')
    @Redirect(CLIENT_URL)
    async logout(@Req() req: CustomRequest) {
      req.logout(done => {
        console.log(done)
      })
    }
}