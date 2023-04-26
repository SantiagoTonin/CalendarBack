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
        isAlpha: { msg: "El nombre solo puede contener letras" },
        notNull: { msg: "el nombre no puede ser nulo" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "El email ya se encuentra registrado en la Base de datos",
      },
      validate: {
        isEmail: { msg: "No es un Email valido" },
        notNull: { msg: "el email no puede ser nulo" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: { msg: "La edad no puede ser nulo" },
      },
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: "El nombre solo puede contener letras" },
        notNull: { msg: "el nationality no puede ser nulo" },
      },
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

User.hasOne(calendar, {
  foreignKey: { name: "userId", allowNull: false },
  sourceKey: "userId",
});

calendar.belongsTo(User, {
  foreignKey: {name:"userId",allowNull: false,validate:{notNull:{msg: "El userId no puede ser null"}}},
  targetKey: "userId",
});

User.hasMany(picture, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  sourceKey: "userId",
});

picture.belongsTo(User, {
  foreignKey: {name:"userId",allowNull: false,validate:{notNull:{msg: "El userId no puede ser null"}}},
  targetKey: "userId",
});
