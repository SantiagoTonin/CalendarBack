import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { tasks } from "./tasks.js";
import { image } from "./imagen.js";

export const cell = sequelize.define("cells", {
  cellsId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
});

cell.hasMany(tasks, {
  foreignKey: "cellsId",
  sourceKey: "cellsId",
});

tasks.belongsTo(cell, {
  foreignKey: "cellsId",
  targetKey: "cellsId",
});

cell.hasMany(image, {
  foreignKey: "cellsId",
  sourceKey: "cellsId",
});

image.belongsTo(cell, {
  foreignKey: "cellsId",
  targetKey: "cellsId",
});

