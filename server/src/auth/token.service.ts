import { ITokenService } from "./ITokenService";

import { TokenServiceBase } from "./base/token.service.base";

export class TokenService extends TokenServiceBase implements ITokenService {
  decodeToken(bearer: string) {
    throw new Error("Method not implemented.");
  }
}
