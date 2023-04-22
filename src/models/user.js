import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { calendar } from "./calendar.js";
import { picture } from "./picture.js";

export const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        esAlfanumerico: function(value) {
          if (!/^[a-zA-Z0-9]+$/.test(value)) {
            throw new Error('El nombre solo puede contener letras y números.');
          }
        },
      },
    },
    birthdate: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USUARIO",
    },
    
},
  {
    timestamps: false,
  }
);

User.hasOne(calendar,{
  foreignKey: "userId",
  sourceKey: "userId",
});

calendar.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(picture, {
  foreignKey:{
    name: "userId",
    allowNull: false,
  },
  sourceKey: "userId",
});

picture.belongsTo(User, {
  foreignKey:{
    name: "userId",
    allowNull: false,
  },
  targetKey: "userId",
});
