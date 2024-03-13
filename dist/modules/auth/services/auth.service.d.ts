import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/services/users.service";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(user: any): Promise<Record<string, string>>;
}
