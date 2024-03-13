import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../../users/services/users.service";


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  /**
   * Use Login by email and password
   * @param user
   * @returns Promise<Record<string, string>>
   */
  async login(user: any): Promise<Record<string, string>> {
    const payload = await this.userService.findByLogin({ email: user.email, password: user.password });
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
