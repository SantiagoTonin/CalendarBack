import { cell } from "../models/cells.js";

export const getCells = async (req, res) => {
  try {
    const allCells = await cell.findAll();
    res.json(allCells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCells = async (req, res) => {
  try {
    const { calendarId } = req.body;
    const date = new Date(); // esto hay q modificar
    const result = await cell.create({
      date: date,
      calendarId: calendarId,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCell = async (req, res) => {
  try {
    const result = await cell.findByPk({ cellId: req.params.id });
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "el Dato que busca no existe" });
  }
};

export const updateCell = async (req, res) => {
  try {
    const { date } = req.body;
    const result = await cell.findByPk(req.params.id);
    result.date = date;
    await result.save();
    res.json({ result, message: "se realizo correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCell = async (req, res) => {
  try {
    const result = await cell.destroy({
      where: { cellId: req.params.id },
    });
    res.json({ message: "La celda fue eleminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "se produjo interno en servidor" });
  }
};
