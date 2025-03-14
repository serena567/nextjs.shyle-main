import { Module } from "@nestjs/common";
import { IsAdminModuleBase } from "./base/isAdmin.module.base";
import { IsAdminService } from "./isAdmin.service";
import { IsAdminController } from "./isAdmin.controller";
import { IsAdminResolver } from "./isAdmin.resolver";

@Module({
  imports: [IsAdminModuleBase],
  controllers: [IsAdminController],
  providers: [IsAdminService, IsAdminResolver],
  exports: [IsAdminService],
})
export class IsAdminModule {}
