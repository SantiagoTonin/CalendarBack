import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const tasks = sequelize.define("tasks", {
  taskId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  postMessage: {
    type: DataTypes.STRING,
  },
});

