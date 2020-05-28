import { Model, Table, Column, DataType, Index } from "sequelize-typescript";
import { providerWrapper } from "midway";

export const factory = () => UserModel;
providerWrapper([
  {
    id: "UserModel",
    provider: factory,
  },
]);
@Table({ tableName: "user", timestamps: false })
export class UserModel extends Model<UserModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  @Index({ name: "uidid", using: "BTREE", order: "ASC", unique: false })
  uid?: number;
  @Column({ type: DataType.STRING(11) })
  @Index({ name: "user_mp", using: "BTREE", order: "ASC", unique: false })
  username!: string;
  @Column({ type: DataType.STRING(20) })
  nickname!: string;
  @Column({ type: DataType.STRING(50) })
  email!: string;
  @Column({ type: DataType.STRING(200) })
  @Index({ name: "user_mp", using: "BTREE", order: "ASC", unique: false })
  password!: string;
  @Column({ type: DataType.STRING(20) })
  ip!: string;
  @Column({ field: "login_time", type: DataType.STRING(30) })
  login_time!: string;
  @Column({ field: "reg_time", type: DataType.STRING(30) })
  reg_time!: string;
  @Column({ type: DataType.INTEGER })
  status!: number;
}

export type IUserModel = typeof UserModel;
