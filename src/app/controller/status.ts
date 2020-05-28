import { Context, controller, get, inject, provide, post } from "midway";
import { IStatus, IStatusService, IUser, IStatusResult } from "../../interface";
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

  @post("/create", { middleware: [EnumMiddleware.authLoggedIn] })
  async createContest(): Promise<void> {
    const { ctx } = this;
    const create: IStatus = await this.service.createStatus(ctx.request.body);
    ctx.body = ctx.helper.rSuc();
  }

  @get("/rank")
  async rankContest(): Promise<any> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const rank: any = await this.service.rankStatus(offset, limit);
    this.ctx.body = { success: true, message: "OK", data: rank };
  }
}
