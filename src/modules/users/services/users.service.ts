import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { LoginDTO } from "../../auth/dto/login";
import { User } from "../schemas/user.schema";
import { IUser } from "../../../types/user";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  /**
   * Create new user
   * @param email
   * @param name
   * @param password
   * @returns User object
   */
  async create(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
       email, 
       password: hashedPassword,
       name, 
    });
    newUser.save();
    return this.sanitizeUser(newUser);
  }

  /**
   * Find user details for login
   * @param UserDTO
   * @returns Promise<any>
   */
  async findByLogin(UserDTO: LoginDTO): Promise<any> {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException("user doesnt exists", HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException("invalid credential", HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Sanitize Object
   * @param user
   * @returns user Object
   */
  sanitizeUser(user: IUser) {
    const sanitized = user.toObject();
    delete sanitized["password"];
    return sanitized;
  }


}
