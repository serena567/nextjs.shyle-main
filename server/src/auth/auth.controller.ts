import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserInfo } from "./UserInfo";
import { User } from "src/user/base/User";
import { Request } from "express"; // Ensure the correct Request type from express
import { Credentials, SignupCredentials } from "./Credentials";

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: Credentials): Promise<UserInfo> {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get("me")
  async me(@Req() request: Request): Promise<User> {
    const authorizationHeader = request.headers['authorization']; // Correct way to access the header
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }
    // Assuming 'Bearer <token>' format for the Authorization header
    const token = authorizationHeader.split(" ")[1]; // Split the Bearer part and extract the token
    if (!token) {
      throw new Error("Token is missing in Authorization header");
    }
    return this.authService.me(token); // Pass the token directly to the service
  }

  @Post("signup")
  async signup(@Body() body: SignupCredentials): Promise<UserInfo> {
    return this.authService.signup(body);
  }
}
