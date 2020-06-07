import { MessageModel } from "./models/message";
import { ContestModel } from "./models/contest";
import { UserModel } from "./models/user";
import { ConteststatusModel } from "./models/conteststatus";
import { StatusModel } from "./models/status";

//message

export type IMessageResult = MessageModel;

export interface IMessage {
  mid?: number;
  name: string;
  autor: string;
  diff: string;
  rel_time: string;
  upd_time: string;
}

export interface IMessageCreateOptions {
  name: string;
  message: string;
  diff: string;
  autor: string;
}

export interface IMessageUpdateDataOptions {
  mid: number;
  name: string;
  message: string;
  diff: string;
}

export interface IMessageService {
  listMessage(offset: number, limit: number, all?: boolean): Promise<IMessage>;
  findMessage(mid: number): Promise<IMessage>;
  findMesname(
    offset: number,
    limit: number,
    mesname: string
  ): Promise<IMessage>;
  updateMessage(data: IMessageUpdateDataOptions): Promise<boolean>;
  deleteMessage(mid: number): Promise<boolean>;
  createMessage(data: IMessageCreateOptions): Promise<IMessageResult>;
  allMessage(): Promise<IMessage>;
}

//contest
export type IContestResult = ContestModel;

export interface IContest {
  cid?: number;
  contests_name: string;
  autor: string;
  mid: number;
  mesname: string;
  begin_time: string;
  end_time: string;
  create_time: string;
  times: number;
}

export interface IContestCreateOptions {
  contests_name: string;
  mid: number;
  mesname: string;
  begin_time: string;
  end_time: string;
  create_time: string;
  times: number;
  autor: string;
}

export interface IContestUpdateDataOptions {
  cid: number;
  contests_name: string;
  mid: number;
  mesname: string;
  begin_time: string;
  end_time: string;
  create_time: string;
  times: number;
}

export interface IContestService {
  listContest(offset: number, limit: number, all?: boolean): Promise<IContest>;
  findContest(mid: number): Promise<IContest>;
  findConname(
    offset: number,
    limit: number,
    conname: string
  ): Promise<IContest>;
  updateContest(data: IContestUpdateDataOptions): Promise<boolean>;
  deleteContest(mid: number): Promise<boolean>;
  createContest(data: IContestCreateOptions): Promise<IContestResult>;
  rankContest(cid: number, offset: number, limit: number): Promise<any>;
  createContestStatus(
    data: IContestStatusCreateOptions
  ): Promise<IContestStatusResult>;
}

//user

export type IUserResult = UserModel;

export interface IUser {
  uid?: number;
  username: string;
  nickname: string;
  email: string;
  password: string;
  ip: string;
  login_time: string;
  reg_time: string;
  status: number;
}

export interface IUserCreateOptions {
  username: string;
  nickname: string;
  email: string;
  password: string;
  status: number;
}

export interface IUserUpdateDataOptions {
  uid: number;
  username?: string;
  nickname: string;
  email: string;
  password: string;
  ip?: string;
  login_time?: string;
  status: number;
}

export interface IUserService {
  listUser(offset: number, limit: number, all?: boolean): Promise<IUser>;
  findUser(mid: number): Promise<IUser>;
  findUserName(name: string): Promise<IUser>;
  findNickname(offset: number, limit: number, name: string): Promise<IUser>;
  updateUser(data: IUser): Promise<boolean>;
  deleteUser(mid: number): Promise<boolean>;
  createUser(data: IContestCreateOptions): Promise<IUserResult>;
  judgeUser(username, password): Promise<IUser>;
}

//conteststatus

export type IContestStatusResult = ConteststatusModel;

export interface IContestStatus {
  csid?: number;
  cid: number;
  uid: number;
  mid: number;
  username: string;
  nickname: string;
  mesname: string;
  speed: number;
  correct_rate: number;
  grade: string;
  wordnum: number;
  time: string;
  wrtime: string;
  instan?: string;
}

export interface IContestStatusCreateOptions {
  cid: number;
  uid: number;
  mid: number;
  username: string;
  nickname: string;
  mesname: string;
  speed: number;
  correct_rate: number;
  grade: string;
  wordnum: number;
  wrtime: string;
  instan: string;
}

//status

export type IStatusResult = StatusModel;

export interface IStatus {
  sid?: number;
  uid?: number;
  mid?: number;
  username: string;
  nickname: string;
  mesname: string;
  speed: number;
  correct_rate: number;
  grade: string;
  wordnum: number;
  time: string;
  wrtime?: string;
  instan?: string;
}

export interface IStatusCreateOptions {
  uid: number;
  mid: number;
  username: string;
  nickname: string;
  mesname: string;
  speed: number;
  correct_rate: number;
  grade: string;
  wordnum: number;
  wrtime: string;
  instan: string;
}

export interface IStatusService {
  createStatus(data: IStatusCreateOptions): Promise<IStatusResult>;
  rankStatus(offset: number, limit: number): Promise<any>;
  UserRankStatus(offset: number, limit: number, name: string): Promise<any>;
  UserStatus(offset: number, limit: number, name: string): Promise<any>;
  listStatus(offset: number, limit: number, all?: boolean): Promise<IStatus>;
}
