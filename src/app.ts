import { DB } from "./models/db";
const bodyParser = require("koa-bodyparser");

// build db connections when starting APP
module.exports = (app) => {
  app.use(
    bodyParser({
      jsonLimit: "50mb", // 控制body的parse转换大小 default 1mb

      formLimit: "50mb", //  控制你post的大小  default 56kb
    })
  );
  app.beforeStart(async () => {
    console.log("🚀 Your awesome APP is launching...");

    await DB.initDB(app.config.sequelize);

    console.log("✅  Your awesome APP launched");
  });
};
