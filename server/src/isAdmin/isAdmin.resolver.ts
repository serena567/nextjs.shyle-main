import * as graphql from "@nestjs/graphql";
import { IsAdminResolverBase } from "./base/isAdmin.resolver.base";
import { IsAdmin } from "./base/IsAdmin";
import { IsAdminService } from "./isAdmin.service";

@graphql.Resolver(() => IsAdmin)
export class IsAdminResolver extends IsAdminResolverBase {
  constructor(protected readonly service: IsAdminService) {
    super(service);
  }
}
