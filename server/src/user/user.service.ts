import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserServiceBase } from "./base/user.service.base";
import { User } from "@prisma/client";

@Injectable()
export class UserService extends UserServiceBase {
  create(arg0: { data: { username: string; password: string; firstName: string; lastName: string; roles: string[]; }; }) {
    throw new Error("Method not implemented.");
  }
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
  async findOne(query: { where: { username: string } }): Promise<User | null> {
    return this.prisma.user.findUnique(query);
  }
  
}
