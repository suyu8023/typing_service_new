import { Context, controller, get, inject, provide, post } from "midway";
import { IContest, IContestService, IContestStatus } from "../../interface";
import { EnumMiddleware } from "../../enum";

@provide()
@controller("/contest")
export class ContestController {
  @inject()
  ctx: Context;

  @inject("contestService")
  service: IContestService;

  @get("/all")
  async listContest(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const message: any = await this.service.listContest(offset, limit);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/find/:id")
  async findContest(): Promise<void> {
    const id: number = this.ctx.params.id;
    const message: IContest = await this.service.findContest(id);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/findconname")
  async findConname(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const name: string = ctx.query.name;
    const message: any = await this.service.findConname(offset, limit, name);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @post("/update", { middleware: [EnumMiddleware.authAdmin] })
  async updateContest(): Promise<void> {
    const { ctx } = this;
    const update: boolean = await this.service.updateContest(
      this.ctx.request.body
    );
    if (update) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("更新失败");
    }
  }

  @post("/delete", { middleware: [EnumMiddleware.authAdmin] })
  async deleteContest(): Promise<void> {
    const { ctx } = this;
    const Delete: boolean = await this.service.deleteContest(
      ctx.request.body.cid
    );
    if (Delete) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("删除失败");
    }
  }

  @post("/create", { middleware: [EnumMiddleware.authAdmin] })
  async createContest(): Promise<void> {
    const { ctx } = this;
    const create: IContest = await this.service.createContest(ctx.request.body);
    ctx.body = ctx.helper.rSuc();
  }

  @get("/rank/:id")
  async rankContest(): Promise<any> {
    const { ctx } = this;
    const id: number = this.ctx.params.id;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const rank: any = await this.service.rankContest(id, offset, limit);
    this.ctx.body = { success: true, message: "OK", data: rank };
  }

  @post("/status/create", { middleware: [EnumMiddleware.authLoggedIn] })
  async createContestStatus(): Promise<void> {
    const { ctx } = this;
    const create: IContestStatus = await this.service.createContestStatus(
      ctx.request.body
    );
    ctx.body = ctx.helper.rSuc();
  }
}
