import { Model, Table, Column, DataType, Index } from "sequelize-typescript";
import { providerWrapper } from "midway";

export const factory = () => ConteststatusModel;
providerWrapper([
  {
    id: "ConteststatusModel",
    provider: factory,
  },
]);
@Table({ tableName: "conteststatus", timestamps: false })
export class ConteststatusModel extends Model<ConteststatusModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: "csidid", using: "BTREE", order: "ASC", unique: false })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  csid?: number;
  @Column({ type: DataType.INTEGER })
  @Index({ name: "cid_uid", using: "BTREE", order: "ASC", unique: false })
  cid!: number;
  @Column({ type: DataType.INTEGER })
  @Index({ name: "cid_uid", using: "BTREE", order: "ASC", unique: false })
  uid!: number;
  @Column({ type: DataType.INTEGER })
  mid!: number;
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
  @Column({ type: DataType.STRING(20) })
  wrtime!: string;
  @Column({ allowNull: true, type: DataType.STRING })
  instan?: string;
  @Column({ allowNull: true, type: DataType.INTEGER })
  backnum?: number;
}

export type IConteststatusModel = typeof ConteststatusModel;
