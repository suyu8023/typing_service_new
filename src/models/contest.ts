import { Model, Table, Column, DataType, Index } from "sequelize-typescript";
import { providerWrapper } from "midway";

export const factory = () => ContestModel;
providerWrapper([
  {
    id: "ContestModel",
    provider: factory,
  },
]);

@Table({ tableName: "contest", timestamps: false })
export class ContestModel extends Model<ContestModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: "cidid", using: "BTREE", order: "ASC", unique: false })
  @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
  cid?: number;
  @Column({ field: "contests_name", type: DataType.STRING(50) })
  contests_name!: string;
  @Column({ type: DataType.STRING(50) })
  autor!: string;
  @Column({ type: DataType.INTEGER })
  mid!: number;
  @Column({ type: DataType.STRING(255) })
  mesname!: string;
  @Column({ field: "begin_time", type: DataType.STRING(20) })
  begin_time!: string;
  @Column({ field: "end_time", type: DataType.STRING(20) })
  end_time!: string;
  @Column({ field: "create_time", type: DataType.STRING(20) })
  create_time!: string;
  @Column({ type: DataType.INTEGER })
  times!: number;
}

export type IContestModel = typeof ContestModel;
