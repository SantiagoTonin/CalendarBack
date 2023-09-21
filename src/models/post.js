import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { tasks } from "./tasks.js";
import { image } from "./imagen.js";

export const post = sequelize.define("post", {
  postId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
},  {
  timestamps: true,
});

post.hasMany(tasks, {
  foreignKey: {
    name: "postId",
    allowNull: false,
  },
  sourceKey: "postId",
});

tasks.belongsTo(post, {
  foreignKey: { name: "postId", allowNull: false, validate: { notNull: { msg: "El userId no puede ser null" } } },
  targetKey: "postId",
});

post.hasMany(image, {
  foreignKey: {
    name: "postId",
    allowNull: false,
  },
  sourceKey: "postId",
});

image.belongsTo(post, {
  foreignKey: { name: "postId", allowNull: false, validate: { notNull: { msg: "El userId no puede ser null" } } },
  targetKey: "postId",
});