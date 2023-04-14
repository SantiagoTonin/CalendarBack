import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { cell } from "./cells.js";



export const calendar = sequelize.define(
  "calendars",
  {
    calendarId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.TEXT,
    },
    info: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

calendar.hasMany(cell, {
  foreignKey: "calendarId",
  sourceKey: "calendarId",
});

cell.belongsTo(calendar, {
  foreignKey: "calendarId",
  targetKey: "calendarId",
});
