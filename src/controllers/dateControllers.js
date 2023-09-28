import { User } from "../models/user.js";
import { picture } from "../models/picture.js";
import { calendar } from "../models/calendar.js";
import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";
import { tasks } from "../models/tasks.js";
import {
  dataUser,
  searchName,
  searchLastName,
  searchUsersNameLastName,
  searchUsersByEmail,
  getDataByDate,
  getPostsByDates,
  getPostByCalendarId,
} from "../lib/dataSerch.js";

import { json, Op, Sequelize } from "sequelize";

export const getDateDays = async (req, res) => {
  try {
    const { day } = req.query;
    const result = await cell.findAll({
      where: {
        [Op.and]: [Sequelize.literal(`DAY(date) = ${day}`)],
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getDateMonth = async (req, res) => {
  try {
    const { month } = req.query;
    const result = await cell.findAll({
      where: {
        [Op.and]: [Sequelize.literal(`MONTH(date) = ${month}`)],
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getDateYear = async (req, res) => {
  try {
    const { year } = req.query;
    const result = await cell.findAll({
      where: {
        [Op.and]: [Sequelize.literal(`YEAR(date) = ${year}`)],
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getExactDate = async (req, res) => {
  try {
    const { calendarId, day, month, year } = req.query;

    const result = await calendar.findAll({
      where: { calendarId },
      include: [
        {
          model: cell,
          where: {
            date: {
              [Op.and]: [
                Sequelize.where(
                  Sequelize.fn("MONTH", Sequelize.col("date")),
                  month
                ),
                Sequelize.where(
                  Sequelize.fn("DAY", Sequelize.col("date")),
                  day
                ),
                Sequelize.where(
                  Sequelize.fn("YEAR", Sequelize.col("date")),
                  year
                ),
              ],
            },
          },
          include: [{ model: tasks }, { model: image }],
        },
      ],
    });

    res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getDataBetweenUsers = async (req, res) => {
  try {
    const { Ids } = req.body;

    const userDataPromises = Ids.map((userId) => {
      return dataUser(userId);
    });

    const userDataArray = await Promise.all(userDataPromises);

    const userDataFiltered = userDataArray.filter((data) => data !== null);

    return res.status(200).json(userDataFiltered);
  } catch (error) {
    res.json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getDataUser = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data || data.trim() === "") {
      res.status(400).json({ message: "El nombre no puede estar vacío" });
      return;
    }

    if (data.includes("@")) {
      const result = (await searchUsersByEmail(data)) || " no data ";
      return res.status(200).json({ result: result });
    }

    const stringWithSpaces = data.replace(/\+/g, " ");
    const arrayName = stringWithSpaces.split(" ");
    console.log(arrayName);

    if (arrayName.length > 1) {
      const name = arrayName[0] || " ";
      const lastName = arrayName.slice(1).join(" ") || " ";
      const result = await searchUsersNameLastName(name, lastName);
      res.status(200).json({ result: result });
    } else {
      const name = arrayName[0];
      const resultName = await searchName(name);
      const resultLastName = await searchLastName(name);
      res
        .status(200)
        .json({ resultName: resultName, resultLastName: resultLastName });
    }
    return;
  } catch (error) {
    res.json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getDataByCell = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) {
      res.status(400).json({ message: "La fecha no puede ser null" });
      return;
    }

    const result = await getDataByDate(date);

    res.status(200).json({ data: result });
  } catch (error) {
    res
      .status(404)
      .json({ error: error, message: "no se pudo traer los datos" });
  }
};

export const getDataByArrayDate = async (req, res) => {
  try {
    const datesArray = req.body.dates;
    console.log(datesArray);

    if (!Array.isArray(datesArray) || datesArray.length === 0) {
      return res.status(400).json({ message: "Formato de datos no válido" });
    }

    const result = await getPostsByDates(datesArray);
    res.status(200).json({ InfoDates: result });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error al obtener datos" });
  }
};

export const dataPostsByCalendarId = async (req, res) => {
  try {
    const { calendarId } = req.body;
    const result = await getPostByCalendarId(calendarId);
    res.status(200).json({ InfoDates: result });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos" });
  }
};
