import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { InjectModel } from "@nestjs/sequelize";
import { CustomRequest } from "@src/utils/types/request";
import { User } from "../user/models/user.model";

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User) private readonly userModel: typeof User
    ) {}

    googleLogin(req: CustomRequest) {
        if (!req.user) {
          return 'No user from google'
        }
    
        return {
          message: 'User information from google',
          user: req.user
        }
      }

      loginSuccess(req: CustomRequest) {
        if (req.user) {
          const email = req.user.email;
          console.log(req.user)
          console.log('email:' + email)
          const results = this.userModel.findAll({
            where: {
              email
            }
          });
          if (results[0] && results[0].id) {
            req.user = results[0]
            return {
              success: true,
              message: "successfull",
              data: req.user,
              //   cookies: req.cookies
            };
          }
        } else {
          throw new UnauthorizedException("failure")
        }
      }
}