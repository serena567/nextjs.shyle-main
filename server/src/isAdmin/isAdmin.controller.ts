import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { IsAdminService } from "./isAdmin.service";
import { IsAdminControllerBase } from "./base/isAdmin.controller.base";

@swagger.ApiTags("isAdmins")
@common.Controller("isAdmins")
export class IsAdminController extends IsAdminControllerBase {
  constructor(protected readonly service: IsAdminService) {
    super(service);
  }
}
