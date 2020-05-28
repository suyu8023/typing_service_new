import { Context } from "midway";
import * as md5 from "md5";
import * as fmt from "format";

export default {
  /**
   * 哈希密码
   * @param {string} password
   * @returns {string}
   */
  hashPassword(password: string): string {
    return md5(password + "__xoj");
  },

  /**
   * 格式化为成功返回
   * @param data
   * @returns {{data: object | undefined; success: boolean}}
   */
  rSuc(data?: object) {
    return {
      success: true,
      data,
    };
  },

  /**
   * 格式化为失败返回
   * @param {string} msg
   * @param data
   * @returns {{msg: string | undefined; data: object | undefined; success: boolean}}
   */
  rFail(msg?: string, data?: object) {
    return {
      success: false,
      msg,
      data,
    };
  },

  /**
   * 格式化为带分页的列表的返回
   * @param {number} page
   * @param {number} limit
   * @param {number} count
   * @param {any[]} rows
   * @returns {{data: {limit: number; count: number; page: number; rows: any[]}; success: boolean}}
   */
  rList({
    page = 0,
    limit = 0,
    count = 0,
    rows = [],
  }: {
    page: number;
    limit: number;
    count: number;
    rows: any[];
  }) {
    return {
      success: true,
      data: {
        page,
        limit,
        count,
        rows,
      },
    };
  },

  /**
   * 格式化为不带分页的完整列表的返回
   * @param {number} count
   * @param {any[]} rows
   * @returns {{data: {count: number; rows: any[]}; success: boolean}}
   */
  rFullList({ count = 0, rows = [] }: { count: number; rows: any[] }) {
    return {
      success: true,
      data: {
        count,
        rows,
      },
    };
  },

  /**
   * 从 query 中获取分页信息
   * @param {{page: number; limit: number}} query
   * @param {number} maxLimit
   * @returns {{offset: number; limit: number; page: number}}
   */
  formatPagination(query: { page: number; limit: number }, maxLimit = 1000) {
    let { page, limit } = query;
    page = Math.max(+page || 1, 1);
    limit = Math.min(Math.max(+limit || 1, 1), maxLimit);
    const offset = (page - 1) * limit;
    return {
      page,
      limit,
      offset,
    };
  },

  /**
   * 是否登录 OJ
   * @param {Context} ctx
   * @returns {boolean}
   */
  isGlobalLoggedIn(ctx: Context) {
    return !!ctx.session.userId;
  },

  /**
   * 当前要操作的 userId 是否是自己
   * @param {Context} ctx
   * @param {number} userId
   * @returns {boolean}
   */
  isSelf(ctx: Context, userId: number) {
    return ctx.session.userId === +userId;
  },

  /**
   * 当前用户是否是教师
   * @param {Context} ctx
   * @returns {boolean}
   */
  //   isTeacher(ctx: Context) {
  //     return ctx.session.permission >= EnumUserPerm.teacher;
  //   },

  /**
   * 当前用户是否是管理员
   * @param {Context} ctx
   * @returns {boolean}
   */
  //   isAdmin(ctx: Context) {
  //     return ctx.session.permission >= EnumUserPerm.admin;
  //   },

  /**
   * 当前用户是否是自己或权限人士（教师及以上）
   * @param {Context} ctx
   * @param {number | string} userId
   * @returns {boolean}
   */
  //   isSelfOrPerm(ctx: Context, userId: number | string) {
  //     return (
  //       ctx.session.userId === +userId ||
  //       ctx.session.permission >= EnumUserPerm.teacher
  //     );
  //   },

  /**
   * 去除对象中的 undefined 属性
   * @param {any} obj
   * @returns {any}
   */
  ignoreUndefined(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * 判断字符串是否在指定长度范围内
   * @param {string} str
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */
  validateStringLength(str: string, min: number, max: number) {
    return typeof str === "string" && str.length >= min && str.length <= max;
  },

  /**
   * 判断数值是否在指定范围内
   * @param {number} number
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */
  validateNumberRange(number: number, min: number, max: number) {
    return number >= min && number <= max;
  },

  /**
   * 计算当前比赛运行状态
   * @param {Date} startAt
   * @param {Date} endAt
   * @returns {EnumContestStatus}
   */
  //   getContestStatus(startAt: Date, endAt: Date) {
  //     const now = new Date();
  //     if (now < startAt) {
  //       return EnumContestStatus.Pending;
  //     } else if (now < endAt) {
  //       return EnumContestStatus.Running;
  //     }
  //     return EnumContestStatus.Ended;
  //   },

  /**
   * 判断是否已登录指定比赛
   * @param {Context} ctx
   * @param {IContestResult["contestId"]} contestId
   * @returns {boolean}
   */
  //   isContestLoggedIn(
  //     ctx: Context,
  //     contestId: IContestResult["contestId"]
  //   ): boolean {
  //     return ctx.session.contests && ctx.session.contests[contestId];
  //   },

  /**
   * 获取 redis 数据
   * @param {Context} ctx
   * @param redis
   * @param {string} key 要获取的 key
   * @param {any[]} args 格式化 key 的参数（%s、%d 等）
   * @returns {Promise<any>}
   */
  async getRedis(ctx: Context, redis, key: string, args: any[]): Promise<any> {
    const k = fmt(key, ...args);
    const ret = JSON.parse((await redis.get(k)) || null);
    ctx.logger.info("[cache] get:", k, ret);
    return ret;
  },

  /**
   * 设置 redis 数据
   * @param {Context} ctx
   * @param redis
   * @param {string} key 要获取的 key
   * @param {any[]} args 格式化 key 的参数（%s、%d 等）
   * @param value 要设置的值
   * @param {number} expires 过期时间，单位为秒
   * @returns {Promise<void>}
   */
  async setRedis(
    ctx: Context,
    redis,
    key: string,
    args: any[],
    value: any,
    expires?: number
  ): Promise<void> {
    const k = fmt(key, ...args);
    expires
      ? await redis.set(k, JSON.stringify(value), "EX", expires)
      : await redis.set(k, JSON.stringify(value));
    ctx.logger.info("[cache] set:", k, value);
  },

  /**
   * 删除 redis 数据
   * @param {Context} ctx
   * @param redis
   * @param {string} key
   * @param {any[]} args
   * @returns {Promise<void>}
   */
  async delRedis(ctx: Context, redis, key: string, args: any[]): Promise<void> {
    const k = fmt(key, ...args);
    await redis.del(k);
    ctx.logger.info("[cache] del:", k);
  },

  /**
   * 上报
   * @param {Context} ctx
   * @param {string} key
   * @param {number} count
   */
  async report(ctx: Context, key: string, count = 1): Promise<void> {
    ctx.logger.info("[report]", key, count);
    // 自定义上报逻辑
  },
};
