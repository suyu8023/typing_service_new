import { Context, controller, get, inject, provide, post } from "midway";
const stringRandom = require("string-random");
var nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport({
  host: "smtpdm.aliyun.com",
  port: 25,
  //"secureConnection": true, // use SSL, the port is 465
  auth: {
    user: "sdutacm_typing@typing.suyu.red", // user name
    pass: "A5C0M6Typing", // password
  },
});

@provide()
@controller("/email")
export class EmailController {
  @inject()
  ctx: Context;
  @post("/create")
  async createEamil(): Promise<void> {
    const { ctx } = this;
    const { email } = ctx.request.body;
    let code = stringRandom(6);
    var mailOptions = {
      from: "SDUTACM<sdutacm_typing@typing.suyu.red>",
      to: email,
      subject: "[SDUTACM Typing] Your Verification Code",
      text: "Hello world",
      html: `<p>Dear User:</p>
             <p>Thanks for using SDUTACM Typing. Your verification code: <strong style="font-size: 150%%;">${code}</strong></p>
             <p>Please use it in 24 hours.</p>
             <p><br></p>
             <p>SDUTACM Typing_Team</p>`, // htm
    };
    await transporter.sendMail(mailOptions);
    ctx.session = {
      email: email,
      code: code,
    };
    ctx.body = ctx.helper.rSuc();
  }

  @get("/judge")
  async judge(): Promise<void> {
    const { ctx } = this;
    let email = ctx.request.query.email;
    let code = ctx.request.query.code;
    if (email == ctx.session.email && code == ctx.session.code) {
      ctx.body = ctx.helper.rSuc();
    } else {
      ctx.body = ctx.helper.rFail();
    }
  }
}
