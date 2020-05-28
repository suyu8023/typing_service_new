import { Model, Table, Column, DataType, Index } from "sequelize-typescript";
import { providerWrapper } from "midway";

export const factory = () => MessageModel;
providerWrapper([
  {
    id: "MessageModel",
    provider: factory,
  },
]);

@Table({ tableName: "message", timestamps: false })
export class MessageModel extends Model<MessageModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: "midid", using: "BTREE", order: "ASC", unique: false })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  mid?: number;
  @Column({ type: DataType.STRING(255) })
  name!: string;
  @Column({ type: DataType.STRING(255) })
  autor!: string;
  @Column({ type: DataType.STRING })
  message!: string;
  @Column({ type: DataType.STRING(255) })
  diff!: string;
  @Column({ field: "rel_time", type: DataType.STRING(20) })
  rel_time!: string;
  @Column({ field: "upd_time", type: DataType.STRING(20) })
  upd_time!: string;
}

export type IMessagetModel = typeof MessageModel;
