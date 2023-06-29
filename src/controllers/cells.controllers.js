import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";


export const getCells = async (req, res) => {
  try {
    const allCells = await cell.findAll();
    const count = await cell.count();
    console.log(count);
    res.json(allCells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCells = async (req, res) => {
  try {
    const { date, calendarId } = req.body;
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

export const getImageCells = async (req, res) => {
  try {
    const result = await cell.findAll({
      include: [
        {
          model: image,
        },
      ],
    });
    console.log(result);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: "no se pudo traer los datos" });
  }
};

