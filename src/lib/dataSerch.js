import { User } from "../models/user.js";
import { picture } from "../models/picture.js";
import { calendar } from "../models/calendar.js";
import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";
import { tasks } from "../models/tasks.js";
import { post } from "../models/post.js";
import { Op } from "sequelize";

export const dataUser = async (dataId) => {
  try {
    const result = await User.findByPk(dataId, {
      attributes: { exclude: ["password", "checkEmail"] },
      include: [
        { model: picture },
        {
          model: calendar,
          include: [
            {
              model: cell,
              include: [
                {
                  model: post,
                  include: [
                    { model: tasks },
                    { model: image },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return result;
  } catch (error) {
    console.error("Error en la función dataUser:", error);
    throw error;
  }
};


export const searchName = async (name) => {
  try {
    const result = await User.findAll({
      attributes: { exclude: ["password", "checkEmail"] },
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return result;
  } catch (error) {
    // Manejo del error aquí
    console.error(error);
    throw error;
  }
};

export const searchLastName = async (lastName) => {
  try {
    const result = await User.findAll({
      attributes: { exclude: ["password", "checkEmail"] },
      where: {
        lastName: {
          [Op.like]: `%${lastName}%`,
        },
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function searchUsersNameLastName(name, lastName) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "checkEmail"] },
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        lastName: {
          [Op.like]: `%${lastName}%`,
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error searching for users:", error);
  }
}

export async function searchUsersByEmail(email) {
  try {
    const users = await User.findOne({
      attributes: { exclude: ["password", "checkEmail"] },
      where: {email: email},
    });
    return users;
  } catch (error) {
    console.error("Error searching for users:", error);
  }
}

export const getDataByDate = async (dateSearched) => {
  try {
    const result = await cell.findOne({
      where: {
        date: dateSearched,
      },
      include: [
        {
          model: post,
          include: [image, tasks],
        },
      ],
    });

    if (!result) {
      throw new Error('No se encontró ninguna Cell para la fecha proporcionada.');
    }

    return result;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};