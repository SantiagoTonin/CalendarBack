import { User } from "../models/user.js";
import { picture } from "../models/picture.js";
import { calendar } from "../models/calendar.js";
import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";
import { tasks } from "../models/tasks.js";
import { post } from "../models/post.js";
import { Op,Sequelize  } from "sequelize";

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
                  include: [{ model: tasks }, { model: image }],
                },
              ],
            },
          ],
        },
      ],
    });
    if (result.pictures) {
      result.pictures.sort((a, b) => b.createdAt - a.createdAt);
    }
    

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
      where: { email: email },
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
      throw new Error(
        "No se encontró ninguna Cell para la fecha proporcionada."
      );}

    if (result.posts && result.posts.length > 0) {
      result.posts.sort((a, b) => b.updatedAt - a.updatedAt);
    }

    return result;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};


export async function getPostsByDates(datesArray) {
  try {
    const results = await cell.findAll({
      where: {
        date: {
          [Op.in]: datesArray,
        },
      },
      include: [
        {
          model: post,
          order: [['createdAt', 'DESC']], // Ordena por createdAt en orden descendente para obtener el post más reciente
          include: [
            {
              model: tasks,
            },
            {
              model: image,
            },
          ],
        },
      ],
    });

    return results;
  } catch (error) {
    throw error;
  }
}



export async function getPostByCalendarId(calendarId) {
  try {
    const result = await calendar.findOne({
      where: { calendarId: calendarId }, // Supongo que 'calendarId' se refiere al campo 'id' en tu modelo 'calendar'
      include: [
        {
          model: cell,
          include: [
            {
              model: post,
              order: [["createdAt", "DESC"]],
              limit: 1, // Limitar a 1 para obtener el post más reciente por celda
              include: [
                {
                  model: tasks,
                },
                {
                  model: image,
                },
              ],
            },
          ],
        },
      ],
    });

    return result;
  } catch (error) {
    throw error;
  }
}


