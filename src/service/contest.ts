import { provide, inject, Context, EggContextLogger } from "midway";
import {
  IContest,
  IContestResult,
  IContestCreateOptions,
  IContestUpdateDataOptions,
  IContestStatus,
  IContestStatusResult,
  IContestStatusCreateOptions,
} from "../interface";
import { IContestModel } from "../models/contest";
import { IConteststatusModel } from "../models/conteststatus";
import moment = require("moment");
import { DB } from "../models/db";
import Sequelize = require("sequelize");
const Op = Sequelize.Op;
@provide()
export class ContestService {
  @inject()
  ctx: Context;

  @inject()
  ContestModel: IContestModel;

  @inject()
  ConteststatusModel: IConteststatusModel;

  async listContest(
    // query: IContestQueryOptions,
    offset = 0,
    limit = 10,
    all = false
  ): Promise<IContest> {
    const res = await this.ContestModel.findAndCountAll({
      offset,
      limit,
      attributes: [
        "cid",
        "contests_name",
        "autor",
        "begin_time",
        "end_time",
        "create_time",
        "times",
        "mid",
      ],
      order: [["create_time", "desc"]],
    });
    return res;
  }

  async findContest(cid = 0): Promise<IContest> {
    const res = await this.ContestModel.findByPk(cid);
    return res;
  }

  async findConname(offset = 0, limit = 10, conname = ""): Promise<IContest> {
    const res = await this.ContestModel.findAndCountAll({
      where: {
        contests_name: {
          [Op.like]: "%" + conname + "%",
        },
      },
      offset,
      limit,
      attributes: [
        "cid",
        "contests_name",
        "autor",
        "begin_time",
        "end_time",
        "create_time",
        "times",
        "mid",
      ],
      order: [["create_time", "desc"]],
    });
    return res;
  }

  async updateContest(data: IContestUpdateDataOptions) {
    const { ctx } = this;
    const updateResult = await this.ContestModel.update(
      ctx.helper.ignoreUndefined({
        contests_name: data.contests_name,
        mid: data.mid,
        mesname: data.mesname,
        begin_time: data.begin_time,
        end_time: data.end_time,
        times: data.times,
      }),
      {
        where: { cid: data.cid },
      }
    );
    return updateResult[0] > 0;
  }

  async deleteContest(cid = 0) {
    const deleteResult = await this.ContestModel.destroy({
      where: { cid: cid },
    });
    return deleteResult > 0;
  }

  async createContest(data: IContestCreateOptions): Promise<IContestResult> {
    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const createResult = await this.ContestModel.create({
      contests_name: data.contests_name,
      mid: data.mid,
      mesname: data.mesname,
      begin_time: data.begin_time,
      end_time: data.end_time,
      create_time: time,
      times: data.times,
      autor: data.autor,
    });
    return createResult;
  }

  async rankContest(cid: number, offset: number, limit = 10): Promise<any> {
    const count = await DB.sequelize.query(
      "select count(distinct uid) as count from conteststatus where cid=?",
      {
        replacements: [cid],
      }
    );

    const rank = await DB.sequelize.query(
      "SELECT p.* FROM (SELECT * FROM conteststatus where cid = ? ORDER BY speed*correct_rate DESC  LIMIT 1000 )p GROUP BY  p.uid ORDER BY speed*correct_rate desc limit ?, ?",
      {
        replacements: [cid, offset, limit],
      }
    );
    let obj = {
      count: count,
      rows: rank[0],
    };
    return obj;
  }

  async UserRankContest(
    cid: number,
    offset: number,
    limit = 10,
    username: string
  ): Promise<any> {
    const count = await DB.sequelize.query(
      "select count(*) as count from conteststatus where cid=? and username=?",
      {
        replacements: [cid, username],
      }
    );

    const rank = await DB.sequelize.query(
      "select * from conteststatus  where cid=? and username=? order by speed*correct_rate desc limit ?, ?",
      {
        replacements: [cid, username, offset, limit],
      }
    );
    let obj = {
      count: count,
      rows: rank[0],
    };
    return obj;
  }

  async createContestStatus(
    data: IContestStatusCreateOptions
  ): Promise<IContestStatusResult> {
    console.log(data);

    let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const createResult = await this.ConteststatusModel.create({
      cid: data.cid,
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
      backnum: data.backnum,
    });
    return createResult;
  }
}
