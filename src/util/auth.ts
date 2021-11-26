import { getEmailByToken } from "./crypto";

export class AuthMiddleware {
  static tokenValidate(_: any, __: string, desc: PropertyDescriptor) {
    const originMethod = desc.value; // get function with a decorator on it.

    desc.value = function (...args: any[]) {
      // argument override
      var argument: any[] = [...args];
      const token = args[1];
      console.log(args);
      argument[0] = getEmailByToken(token);

      // run function
      return originMethod.apply(this, [...argument]);
    };
  }
}
