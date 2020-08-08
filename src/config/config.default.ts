import { EggAppConfig, EggAppInfo, PowerPartial } from "midway";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = <DefaultConfig>{};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_{{keys}}";
  // add your config here
  config.middleware = [];

  config.sequelize = {
    host: "127.0.0.1",
    port: "3306",
    user: "suyu",
    password: "suyu8023",
    database: "typing",
    dialect: "mysql",
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["*"],
  };
  // add your user config here
  config.cors = {
    origin: "*", //允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.session = {
    key: "SESSION_ID",
    maxAge: 1000 * 60 * 60 * 5,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  return config;
};
