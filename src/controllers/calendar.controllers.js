import { calendar } from "../models/calendar.js";

export const getCalendars = async (req, res) => {
  const arraycalendar = await calendar.findAll();
  res.json(arraycalendar);
};
export const createCalendar = async (req, res) => {
  const { description, info } = req.body;

  const newCalendar = await calendar.create({
    description: description,
    info: info,
  });

  console.log(newCalendar);
  res.send("creando calendario");
};
