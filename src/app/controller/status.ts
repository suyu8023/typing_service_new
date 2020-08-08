import { Context, controller, get, inject, provide, post } from "midway";
import { IStatus, IStatusService, IUser, IUserService } from "../../interface";
import { EnumMiddleware } from "../../enum";

@provide()
@controller("/status")
export class StatusController {
  @inject()
  ctx: Context;

  @inject("statusService")
  service: IStatusService;

  @get("/all")
  async listContest(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const message: any = await this.service.listStatus(offset, limit);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/findUserStatus")
  async findUserStatus(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const name: string = ctx.query.name;
    const message: any = await this.service.UserStatus(offset, limit, name);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/findUserRankStatus")
  async findUserRankStatus(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const name: string = ctx.query.name;
    const message: any = await this.service.UserRankStatus(offset, limit, name);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/findUserStatusRecord")
  async findUserStatusRecord(): Promise<void> {
    const { ctx } = this;
    const name: string = ctx.query.name;
    const message: any = await this.service.UserStatusRecord(name);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @post("/create", { middleware: [EnumMiddleware.authLoggedIn] })
  async createContest(): Promise<void> {
    const { ctx } = this;
    if (ctx.session.uid == ctx.request.body.uid) {
      const create: IStatus = await this.service.createStatus(ctx.request.body);
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("没有权限操作");
    }
  }

  @get("/rank")
  async rankContest(): Promise<any> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const rank: any = await this.service.rankStatus(offset, limit);
    this.ctx.body = { success: true, message: "OK", data: rank };
  }
}
