import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IsAdminServiceBase } from "./base/isAdmin.service.base";

@Injectable()
export class IsAdminService extends IsAdminServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
