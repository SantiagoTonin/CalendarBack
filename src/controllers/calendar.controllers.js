import { calendar } from "../models/calendar.js";

export const getCalendars = async (req, res) => {
  try {
    const arraycalendar = await calendar.findAll();
    res.json(arraycalendar);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCalendar = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await calendar.findOne({
      where: {
        calendarId: req.params.id
      },
  });
  if (!result) {
    return res.status(400).json({ message: "El Dato que busca no existe",status:400 });
  }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCalendar = async (req, res) => {
  try {
    const { description, info } = req.body;

    const newCalendar = await calendar.create({
      description: description,
      info: info,
    });
    res.json(newCalendar);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const upgradeCalendar = async (req, res) => {
  try {
    const { description, info } = req.body;
    const result = await calendar.findByPk(req.params.id);
    if (result === null) {
      throw new Error("El ID no existe.");
    }

    result.description = description || "";
    result.info = info || "";
    await result.save();
    res.json({
      result: result,
      message: "La actualizacion se realizo exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteInfoCalendar = async (req, res) => {
  try {
    const result = await calendar.destroy({
      where: { calendarId: req.params.id },
    });

    if (result === 0) {
      return res.status(500).json({
        message: "no se encontro la informacion que desea eliminar",
        status: 500,
      });
    }

    return res.status(200).json({
      message: "La info del calendario fue eliminada exitosamente",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
