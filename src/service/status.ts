import { provide, inject, Context, EggContextLogger } from "midway";
import { IStatus, IStatusCreateOptions, IStatusResult } from "../interface";
import { IStatusModel } from "../models/status";
import moment = require("moment");
import { DB } from "../models/db";
import { IUserModel } from "../models/user";
// import {  } from
// import "moment/locale/zh-cn";
// moment.locale("zh-cn");
// const Op = Sequelize.Op;

// function formatQuery(ctx: Context, options: IMessage) {
//   const q = ctx.helper.ignoreUndefined({
//     contestId: options.contestId,
//     type: options.type,
//     mode: options.mode
//   });
//   if (options.title) {
//     q.title = {
//       [Op.like]: `%${options.title}%`
//     };
//   }
//   return q;
// }

@provide()
export class StatusService {
  @inject()
  ctx: Context;

  @inject()
  StatusModel: IStatusModel;

  async listStatus(
    // query: IContestQueryOptions,
    offset = 0,
    limit = 10,
    all = false
  ): Promise<IStatus> {
    const res = await this.StatusModel.findAndCountAll({
      offset,
      limit,
      order: [["time", "desc"]],
    });
    return res;
  }

  async rankStatus(offset: number, limit = 10): Promise<any> {
    const count = await this.StatusModel.count();
    const rank = await DB.sequelize.query(
      "select * from status order by speed*correct_rate desc limit ?, ?",
      {
        replacements: [offset, limit],
      }
    );

    let obj = {
      count: count,
      rows: rank[0],
    };
    return obj;
  }

  async UserStatus(offset: 0, limit = 10, username = ""): Promise<any> {
    const count = await this.StatusModel.count({
      where: {
        username: username,
      },
    });
    const rank = await DB.sequelize.query(
      "select * from status where username=? order by time desc limit ?, ?",
      {
        replacements: [username, offset, limit],
      }
    );

    let obj = {
      count: count,
      rows: rank[0],
    };
    return obj;
  }

  async UserStatusRecord(username = ""): Promise<any> {
    const rank = await DB.sequelize.query(
      "select date_format(time, '%Y-%m-%d') date, count(*) as count from status where username = ? group by date_format(time, '%Y-%m-%d');",
      {
        replacements: [username],
      }
    );
    let obj = {
      rows: rank[0],
    };
    return obj;
  }

  async UserRankStatus(offset: 0, limit = 10, username = ""): Promise<any> {
    const count = await this.StatusModel.count({
      where: {
        username: username,
      },
    });
    const rank = await DB.sequelize.query(
      "select * from status where username=? order by speed*correct_rate desc limit ?, ?",
      {
        replacements: [username, offset, limit],
      }
    );

    let obj = {
      count: count,
      rows: rank[0],
    };
    return obj;
  }

  async createStatus(data: IStatusCreateOptions): Promise<IStatusResult> {
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    // const updateResult = await this.UserModel.update(
    //   this.ctx.helper.ignoreUndefined({
    //     ch: data.ch.join(","),
    //   }),
    //   {
    //     where: { uid: data.uid },
    //   }
    // );
    // console.log(updateResult);

    const createResult = await this.StatusModel.create({
      uid: data.uid,
      mid: data.mid,
      username: data.username,
      nickname: data.nickname,
      mesname: data.mesname,
      speed: data.speed,
      correct_rate: data.correct_rate,
      grade: data.grade,
      wordnum: data.wordnum,
      time: time,
      wrtime: data.wrtime,
      instan: data.instan,
      backname: data.backnum,
    });
    return createResult;
  }
}
