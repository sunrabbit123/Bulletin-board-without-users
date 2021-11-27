import { UnauthorizedException } from "@nestjs/common";
import { getEmailByToken } from "./crypto";

export class AuthMiddleware {
  static tokenValidate(_: any, __: string, desc: PropertyDescriptor) {
    const originMethod = desc.value; // get function with a decorator on it.

    desc.value = function (...args: any[]) {
      // argument override
      var argument: any[] = [...args];
      const token = args[1];
      argument[0] = getEmailByToken(token);
      if (!argument[0]) {
        throw new UnauthorizedException("토큰값이 이상합니다");
      }
      // run function
      return originMethod.apply(this, [...argument]);
    };
  }
}
