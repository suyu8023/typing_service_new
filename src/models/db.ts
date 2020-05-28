import { Sequelize } from "sequelize-typescript";
import { provide, scope, ScopeEnum } from "midway";
import { MessageModel } from "./message";
import { ContestModel } from "./contest";
import { UserModel } from "./user";
import { ConteststatusModel } from "./conteststatus";
import { StatusModel } from "./status"

interface ISequelizeConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  dialect: string;
}

// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@scope(ScopeEnum.Singleton)
@provide("DB")
export class DB {
  public static sequelize: Sequelize;

  public static async initDB(config: ISequelizeConfig) {
    DB.sequelize = new Sequelize({
      database: config.database,
      dialect: "mysql",
      username: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
      timezone: "+08:00",
      logQueryParameters: true,
      // operatorsAliases: true
    });

    // add models here before using them
    DB.sequelize.addModels([
      MessageModel,
      ContestModel,
      UserModel,
      ConteststatusModel,
      StatusModel
    ]);

    try {
      await DB.sequelize.authenticate();
      //   await DB.sequelize.sync();
      // await DB.sequelize.sync({ force: true });
    } catch (error) {
      error.message = `DB connection error: ${error.message}`;
      throw error;
    }
  }
}
