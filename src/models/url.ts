// src/models/employee.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
export interface UrlAttributes {
  id?: number;
  long_url: string;
  short_url: string;
  password?: string;
  expiry_date?: Date;
  custom_code?: string;
}

export class Url extends Model<UrlAttributes> implements UrlAttributes {
  public id!: number;
  public long_url!: string;
  public short_url!: string;
  public password!: string;
  public expiry_date!: Date;
  public custom_code!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static tableName = "url";
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    long_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    short_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true, // Optional field
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true, // Optional field
    },
    custom_code: {
      type: DataTypes.STRING(255),
      allowNull: true, // Optional field
    },
  },
  {
    sequelize,
    tableName: "url",
  }
);

export default Url;
