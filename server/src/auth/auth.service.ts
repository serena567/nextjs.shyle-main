import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Credentials, SignupCredentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserInfo } from "./UserInfo";
import { UserService } from "../user/user.service";
import { User } from "../user/base/User";

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  // 用户验证方法
  async validateUser(username: string, password: string): Promise<UserInfo | null> {
    const user = await this.userService.findOne({ where: { username } });
    
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id, roles } = user;
      return { id, username, roles: roles as string[] };
    }
    return null;
  }

  // 登录方法
  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    
    // 生成访问 token
    const accessToken = await this.tokenService.createToken({ id: user.id, username, password: "" });  // 这里传递一个空密码
    return { accessToken, ...user };
  }

  // 注册方法
  async signup(credentials: SignupCredentials): Promise<UserInfo> {
    const { username, password, firstName, lastName } = credentials;
    const hashedPassword = await this.passwordService.hash(password);
    
    // 创建用户
    const user = await this.userService.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        roles: ["admin"], // 默认角色可以根据需要调整
      },
    });

    if (!user) {
      throw new UnauthorizedException("Could not create user");
    }
    
    // 创建访问 token
    const accessToken = await this.tokenService.createToken({ id: user, username, password: "" });  // 这里传递一个空密码
    return {
      accessToken,
      username,
      id: user,
      roles: user.roles as { roles: string[] },
    };
  }

  // 获取当前用户信息
  async me(authorization: string = ""): Promise<User> {
    const bearer = authorization.replace("Bearer ", "");  // 获取 Bearer Token
    const username = this.tokenService.decodeToken(bearer); // 解码 Token 获取用户名

    const result = await this.userService.findOne({
      where: { username }, // 使用解码后的用户名
      select: {
        createdAt: true,
        firstName: true,
        id: true,
        lastName: true,
        roles: true,
        updateAt: true,
        username: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`No resource was found for ${username}`);
    }

    return result;
  }
}
