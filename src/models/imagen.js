import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { tasks } from "./tasks.js";

export const image = sequelize.define("images", {
  imageId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,
  },
  mime: {
    type: DataTypes.STRING,
  },
  imageSize: {
    type: DataTypes.STRING,
  },
});

