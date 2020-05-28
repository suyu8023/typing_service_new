import { Model, Table, Column, DataType, Index } from "sequelize-typescript";
import { providerWrapper } from "midway";

export const factory = () => StatusModel;
providerWrapper([
  {
    id: "StatusModel",
    provider: factory,
  },
]);
@Table({ tableName: "status", timestamps: false })
export class StatusModel extends Model<StatusModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  @Index({ name: "sidid", using: "BTREE", order: "ASC", unique: false })
  sid?: number;
  @Column({ allowNull: true, type: DataType.INTEGER })
  @Index({ name: "uidid", using: "BTREE", order: "ASC", unique: false })
  uid?: number;
  @Column({ allowNull: true, type: DataType.INTEGER })
  mid?: number;
  @Column({ type: DataType.STRING(100) })
  username!: string;
  @Column({ type: DataType.STRING(100) })
  nickname!: string;
  @Column({ type: DataType.STRING(100) })
  mesname!: string;
  @Column({ type: DataType.DOUBLE(10, 2) })
  speed!: number;
  @Column({ field: "correct_rate", type: DataType.DOUBLE(10, 2) })
  correct_rate!: number;
  @Column({ type: DataType.STRING(100) })
  grade!: string;
  @Column({ type: DataType.INTEGER })
  wordnum!: number;
  @Column({ type: DataType.STRING(20) })
  time!: string;
  @Column({ allowNull: true, type: DataType.STRING(20) })
  wrtime?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  instan?: string;
}

export type IStatusModel = typeof StatusModel;
