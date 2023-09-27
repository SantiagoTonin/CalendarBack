import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const picture = sequelize.define(
  "picture",
  {
    pictureId: {
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
  },
  {
    defaultScope: {
      order: [["createdAt", "DESC"]],
    },
  }
);
