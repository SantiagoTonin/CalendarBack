import Sequelize from "sequelize";
import {config} from "dotenv";

config()

const user = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "root";
const database = process.env.DB_DATABASE || "calendardb";


export const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "mysql",
});
