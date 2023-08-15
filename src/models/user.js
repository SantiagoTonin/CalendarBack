import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { calendar } from "./calendar.js";
import { picture } from "./picture.js";
import {generateToken} from "../helpers/generateToken.js";
import { hashPassword } from "../helpers/passwordUtils.js";


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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: "El apellido solo puede contener letras" },
        notNull: { msg: "el apellido no puede ser nulo" },
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
    checkEmail:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);


(async () => {
  try {
    
    const existingSuperAdmin = await User.findOne({ where: { rol: 'superADMIN' } });

    if (existingSuperAdmin){

      const tokenrec = generateToken(existingSuperAdmin.dataValues);
      console.log(tokenrec);
    }

    if (!existingSuperAdmin) {
      const encryptedPassword = await pass();
      const nuevoUsuario = await User.create({
        name: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: encryptedPassword,
        age: 0,
        birthdate: '1991-02-19', 
        nationality: 'argentina',
        rol: 'superADMIN',
        checkEmail: true,
      });

      console.log('Nuevo usuario creado:', nuevoUsuario.toJSON());
    }
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
})();

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



const pass = async () => {
  try {
    const passwordEncryption = await hashPassword("adminadmin");
    console.log(typeof passwordEncryption);
    return passwordEncryption;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; 
  }
};
