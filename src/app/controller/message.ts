import { Context, controller, get, inject, provide, post } from "midway";
import { IMessage, IMessageService, IMessageResult } from "../../interface";
import { EnumCacheKey, EnumMiddleware } from "../../enum";

@provide()
@controller("/message")
export class MessageController {
  @inject()
  ctx: Context;

  @inject("messageService")
  service: IMessageService;

  @get("/all")
  async listMessage(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const message: any = await this.service.listMessage(offset, limit);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/find/:id")
  async findMessage(): Promise<void> {
    const id: number = this.ctx.params.id;
    const message: IMessage = await this.service.findMessage(id);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @post("/update", { middleware: [EnumMiddleware.authAdmin] })
  async updateMessage(): Promise<void> {
    const { ctx } = this;
    const update: boolean = await this.service.updateMessage(
      this.ctx.request.body
    );
    if (update) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("更新失败");
    }
  }

  @post("/delete", { middleware: [EnumMiddleware.authAdmin] })
  async deleteMessage(): Promise<void> {
    const { ctx } = this;
    const Delete: boolean = await this.service.deleteMessage(
      ctx.request.body.mid
    );
    if (Delete) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("删除失败");
    }
  }

  @post("/create", { middleware: [EnumMiddleware.authAdmin] })
  async createMessage(): Promise<void> {
    const { ctx } = this;
    const create: IMessage = await this.service.createMessage(ctx.request.body);
    ctx.body = ctx.helper.rSuc();
  }

  @get("/list")
  async allMessage(): Promise<void> {
    const { ctx } = this;
    const all: IMessage = await this.service.allMessage();
    ctx.body = { success: true, message: "OK", data: all };
  }
}
