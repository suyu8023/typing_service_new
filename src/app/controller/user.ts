import { Context, controller, get, inject, provide, post } from "midway";
import { IUser, IUserService } from "../../interface";

@provide()
@controller("/user")
export class UserController {
  @inject()
  ctx: Context;

  @inject("userService")
  service: IUserService;

  @get("/all")
  async listUser(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const message: any = await this.service.listUser(offset, limit);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/find/:id")
  async findUse(): Promise<void> {
    const id: number = this.ctx.params.id;
    const message: IUser = await this.service.findUser(id);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/findNickname")
  async findNickname(): Promise<void> {
    const { ctx } = this;
    const { limit, offset } = ctx.helper.formatPagination(ctx.query);
    const name: string = this.ctx.query.name;
    const message: IUser = await this.service.findNickname(offset, limit, name);
    this.ctx.body = { success: true, message: "OK", data: message };
  }

  @get("/findUsername")
  async findUsername(): Promise<void> {
    const { ctx } = this;
    const name: string = this.ctx.query.name;
    const message: IUser = await this.service.findUserName(name);
    if (message == undefined) {
      this.ctx.body = { success: false };
    } else {
      this.ctx.body = { success: true, message: "OK", data: message };
    }
  }

  @post("/update")
  async updateUse(): Promise<void> {
    const { ctx } = this;
    if (ctx.session.uid !== ctx.request.body.uid && ctx.session.status == 0) {
      ctx.body = ctx.helper.rFail("更新失败");
    } else {
      const update: boolean = await this.service.updateUser(
        this.ctx.request.body
      );
      if (update) {
        ctx.body = ctx.helper.rSuc();
      } else {
        ctx.body = ctx.helper.rFail("更新失败");
      }
    }
  }

  @post("/delete")
  async deleteUse(): Promise<void> {
    const { ctx } = this;
    const Delete: boolean = await this.service.deleteUser(ctx.request.body.uid);
    if (Delete) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("删除失败");
    }
  }

  @post("/create")
  async createUse(): Promise<void> {
    const { ctx } = this;
    const create: IUser = await this.service.createUser(ctx.request.body);
    ctx.body = ctx.helper.rSuc();
  }

  @post("/createList")
  async createUseList(): Promise<void> {
    const { ctx } = this;
    const create: IUser = await this.service.createUserList(ctx.request.body);
    ctx.body = ctx.helper.rSuc();
  }

  @post("/login")
  async judgeUse(): Promise<void> {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const create: IUser = await this.service.judgeUser(username, password);
    if (create) {
      ctx.body = ctx.helper.rSuc(create);
      ctx.session = {
        uid: create.uid,
        username: create.username,
        nickname: create.nickname,
        status: create.status,
      };
    } else {
      ctx.body = ctx.helper.rFail("账号密码输入有误");
    }
  }

  @get("/judge")
  async judge(): Promise<void> {
    const { ctx } = this;
    const { username, password } = ctx.request.query;
    const create: IUser = await this.service.judgeUser(username, password);
    if (create) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail("账号密码输入有误");
    }
  }
}
