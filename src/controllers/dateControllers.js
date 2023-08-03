import { User } from "../models/user.js";
import { picture } from "../models/picture.js";
import { calendar } from "../models/calendar.js";
import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";
import { tasks } from "../models/tasks.js";
import {dataUser} from "../lib/dataSerch.js";

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
    return dataUser(userId)
  });

 
  const userDataArray = await Promise.all(userDataPromises);

 
  const userDataFiltered = userDataArray.filter((data) => data !== null);

  return res.status(200).json(userDataFiltered);
 } catch (error) {
  res.json({ error: error, message: "no se pudo traer los datos" });
 }
};
