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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo description no puede ser nulo",
        },
        len: {
          args: [0, 500],
          msg: "La longitud de la descripción debe estar entre 0 y 500 caracteres",
        },
      },
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "el campo description no puede ser null" },
        len: {
          args: [0, 100],
          msg: "La longitud de la descripción debe estar entre 0 y 100 caracteres",
        },
      },
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
