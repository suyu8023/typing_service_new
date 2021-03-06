import { provide, inject, Context, EggContextLogger } from "midway";
import {
  IUser,
  IUserResult,
  IUserCreateOptions,
  IUserUpdateDataOptions,
} from "../interface";
import { IUserModel } from "../models/user";
import moment = require("moment");
import Sequelize = require("sequelize");
import { DB } from "../models/db";
import { Md5 } from "ts-md5/dist/md5";
const Op = Sequelize.Op;

let getClientIp = (req) => {
  try {
    let ipAddress;
    console.log("wewewe");

    let forwardedIpsStr = req.header("x-forwarded-for");
    console.log("asasas", forwardedIpsStr);

    if (forwardedIpsStr) {
      var forwardedIps = forwardedIpsStr.split(",");
      ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress;
    }
    console.log(ipAddress);

    return (
      req.headers["x-wq-realip"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    );
  } catch (e) {
    return "";
  }
};

@provide()
export class UserService {
  @inject()
  ctx: Context;

  @inject()
  UserModel: IUserModel;

  async listUser(
    // query: IContestQueryOptions,
    offset = 0,
    limit = 10,
    all = false
  ): Promise<IUser> {
    const res = await this.UserModel.findAndCountAll({
      offset,
      limit,
      attributes: [
        "uid",
        "username",
        "nickname",
        "email",
        "ip",
        "login_time",
        "reg_time",
        "status",
        "ch",
      ],
    });
    return res;
  }

  async findUser(uid = 0): Promise<IUser> {
    const res = await this.UserModel.findOne({
      where: {
        uid: uid,
      },
      attributes: [
        "uid",
        "username",
        "nickname",
        "email",
        "ip",
        "login_time",
        "reg_time",
        "status",
        "ch",
      ],
    });
    return res;
  }

  async findUserName(name = ""): Promise<IUser> {
    const res = await this.UserModel.findOne({
      where: {
        username: name,
      },
      attributes: ["username"],
    });
    return res;
  }

  async findNickname(offset = 0, limit = 10, name = ""): Promise<IUser> {
    const res = await this.UserModel.findAndCountAll({
      where: {
        username: {
          [Op.like]: "%" + name + "%",
        },
      },
      offset,
      limit,
      attributes: [
        "uid",
        "username",
        "nickname",
        "email",
        "ip",
        "login_time",
        "reg_time",
        "status",
        "ch",
      ],
    });
    return res;
  }

  async updateUser(data: IUserUpdateDataOptions) {
    const { ctx } = this;
    console.log(data.password);
    const updateResult = await this.UserModel.update(
      ctx.helper.ignoreUndefined({
        nickname: data.nickname,
        email: data.email,
        password: data.password ? Md5.hashStr(data.password) : data.password,
        status: data.status,
        ch: data.ch,
      }),
      {
        where: { uid: data.uid },
      }
    );
    return updateResult[0] > 0;
  }

  async deleteUser(uid = 0) {
    const deleteResult = await this.UserModel.destroy({
      where: { uid: uid },
    });
    return deleteResult > 0;
  }

  async createUser(data: IUserCreateOptions): Promise<IUserResult> {
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const { ctx } = this;

    const createResult = await this.UserModel.create({
      username: data.username,
      nickname: data.nickname,
      email: data.email,
      password: Md5.hashStr(data.password),
      ip: "acm",
      login_time: time,
      reg_time: time,
      status: 1,
    });
    return createResult;
  }

  async createUserList(data: Array<IUserCreateOptions>): Promise<IUserResult> {
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const { ctx } = this;

    const createResult = await this.UserModel.bulkCreate(data);
    return createResult;
  }
  async judgeUser(username, password): Promise<IUser> {
    const judge = await this.UserModel.findOne({
      where: {
        username: username,
        password: password,
      },
      attributes: ["uid", "username", "nickname", "email", "status", "ch"],
    });
    return judge;
  }
}
