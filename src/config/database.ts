// src/config/database.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER || "error",
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE_NAME || "error",
  PORT: process.env.DB_PORT,
  DIALECT: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "postgres",
    logging: false
  }
);

export default sequelize;