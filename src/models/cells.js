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
  date: {
    type: DataTypes.DATE,
  },
  
},  {
  timestamps: false,
});

cell.hasMany(tasks, {
  foreignKey: {
    name: "cellsId",
    allowNull: false,
  },
  sourceKey: "cellsId",
});

tasks.belongsTo(cell, {
  foreignKey: {name:"cellsId",allowNull: false,validate:{notNull:{msg: "El userId no puede ser null"}}},
  targetKey: "cellsId",

});

cell.hasMany(image, {
  foreignKey: {
    name: "cellsId",
    allowNull: false,
  },
  sourceKey: "cellsId",
});

image.belongsTo(cell, {
  foreignKey: {name:"cellsId",allowNull: false,validate:{notNull:{msg: "El userId no puede ser null"}}},
  targetKey: "cellsId",
});

