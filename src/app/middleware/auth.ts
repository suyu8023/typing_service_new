import { WebMiddleware, provide, Context } from "midway";
import { EnumUserPerm } from "../../enum";

/**
 * 鉴权路由中间件
 * @param {{permission: number}} options
 * @returns {any}
 */
export function authMiddlewareFactory(options: { permission: number }): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    if (ctx.session.status >= options.permission) {
      await next();
    } else {
      ctx.body = ctx.helper.rFail("没有权限操作");
    }
  };
}

@provide()
export class AuthLoggedInMiddleware implements WebMiddleware {
  resolve() {
    return authMiddlewareFactory({ permission: EnumUserPerm.user });
  }
}

@provide()
export class AuthTeacherMiddleware implements WebMiddleware {
  resolve() {
    return authMiddlewareFactory({ permission: EnumUserPerm.teacher });
  }
}

@provide()
export class AuthAdminMiddleware implements WebMiddleware {
  resolve() {
    return authMiddlewareFactory({ permission: EnumUserPerm.admin });
  }
}
