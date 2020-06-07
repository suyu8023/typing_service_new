import { provide, inject, Context, EggContextLogger } from "midway";
import {
  IMessage,
  IMessageResult,
  IMessageCreateOptions,
  IMessageUpdateDataOptions,
} from "../interface";
import { IMessagetModel } from "../models/message";
import moment = require("moment");
import Sequelize = require("sequelize");
const Op = Sequelize.Op;
// var Op = Sequelize.Op;
// var Sequelize = require('sequelize');

@provide()
export class MessageService {
  @inject()
  ctx: Context;

  @inject()
  MessageModel: IMessagetModel;

  async listMessage(
    // query: IContestQueryOptions,
    offset = 0,
    limit = 10,
    all = false
  ): Promise<IMessage> {
    const res = await this.MessageModel.findAndCountAll({
      offset,
      limit,
      attributes: ["mid", "name", "autor", "diff", "rel_time", "upd_time"],
    });
    return res;
  }

  async findMessage(mid = 0): Promise<IMessage> {
    const res = await this.MessageModel.findByPk(mid);
    return res;
  }

  async findMesname(offset = 0, limit = 10, mesname = ""): Promise<IMessage> {
    const res = await this.MessageModel.findAndCountAll({
      where: {
        name: {
          [Op.like]: "%" + mesname + "%",
        },
      },
      offset,
      limit,
      attributes: ["mid", "name", "autor", "diff", "rel_time", "upd_time"],
    });
    return res;
  }

  async updateMessage(data: IMessageUpdateDataOptions) {
    const { ctx } = this;
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const updateResult = await this.MessageModel.update(
      ctx.helper.ignoreUndefined({
        name: data.name,
        message: data.message,
        diff: data.diff,
        upd_time: time,
      }),
      {
        where: { mid: data.mid },
      }
    );
    return updateResult[0] > 0;
  }

  async deleteMessage(mid = 0) {
    const deleteResult = await this.MessageModel.destroy({
      where: { mid: mid },
    });
    return deleteResult > 0;
  }

  async createMessage(data: IMessageCreateOptions): Promise<IMessageResult> {
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const createResult = await this.MessageModel.create({
      name: data.name,
      message: data.message,
      diff: data.diff,
      autor: data.autor,
      rel_time: time,
      upd_time: time,
    });
    return createResult;
  }

  async allMessage(): Promise<IMessage> {
    const all = await this.MessageModel.findAll({
      attributes: ["mid", "name"],
    });
    return all;
  }

  // async createMessage(name = "", message = "", diff = ""):Promise<IMessageResult>{
  //   const createResult = await
  // };
  // async createContest(data: IContestCreateOptions): Promise<IContestResult> {
  //   return this.ContestModel.create({
  //     title: data.title,
  //     description: data.description,
  //     type: data.type,
  //     password: data.password || "",
  //     mode: data.mode,
  //     startAt: data.startAt,
  //     endAt: data.endAt,
  //     hidden: data.hidden
  //   }).then(r => r.get({ plain: true }));
  // }

  // async updateContest(
  //   query: IContestUpdateQueryOptions,
  //   data: IContestUpdateDataOptions
  // ) {
  //   const { ctx } = this;
  //   const updateResult = await this.ContestModel.update(
  //     ctx.helper.ignoreUndefined({
  //       title: data.title,
  //       description: data.description,
  //       type: data.type,
  //       password: data.password,
  //       mode: data.mode,
  //       startAt: data.startAt,
  //       endAt: data.endAt,
  //       hidden: data.hidden
  //     }),
  //     {
  //       where: {
  //         contestId: query.contestId
  //       }
  //     }
  //   );
  //   return updateResult[0] > 0;
  // }
}
