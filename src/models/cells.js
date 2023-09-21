import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { post } from "./post.js";

export const cell = sequelize.define(
  "cells",
  {
    cellsId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

cell.hasMany(post, {
  foreignKey: {
    name: "cellsId",
    allowNull: false,
  },
  sourceKey: "cellsId",
});

post.belongsTo(cell, {
  foreignKey: {
    name: "cellsId",
    allowNull: false,
  },
  targetKey: "cellsId",
});
