import { tasks } from "../models/tasks.js";

export const getTasks = async (req, res) => {
  try {
    const results = await tasks.findAll();
    res.json(results);
  } catch (error) {
    res.status(500);
  }
};
export const getTask = async (req, res) => {
  try {
    const result = await tasks.findByPk(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "La tarea que busca no existe" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};
export const createTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await tasks.create(name, description);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "No se pudo crear la tarea" });
  }
};
export const upgradeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await tasks.findByPk(id);
    result.name = name;
    result.description = description;
    await result.save();
    res.json(result, { message: "El cambio se realizo correctamente" });
  } catch (error) {
    res.status(500).json({ message: "No se pudo modificar la tarea" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    await tasks.destroy({
      where: { taskId: req.params.id },
    });
    res.json({ message: "La tarea se elimino correctamente" });
  } catch (error) {
    res.status(500).json({ message: "se produjo interno en servidor" });
  }
};
