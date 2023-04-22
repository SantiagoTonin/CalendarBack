import { request } from "express";
import { User } from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getUser = async (req, res) => {
  try {
    const result = await User.findByPk(req.params.id );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, email, birthdate, nationality, age } = req.body;
    const newUser = await User.create({
      name: name,
      email: email,
      birthdate: birthdate,
      nationality: nationality,
      age: age,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "no se pudo crear al usuario", error: error });
  }
};
export const upgrateUser = async (req, res) => {
  try {
    const { name, email, birthdate, nationality, age } = req.body;
    const result = await User.findByPk(req.params.id);
    console.log(result);
    if (result === null) {
      throw new Error("El ID no existe.");
    }
    result.name = name;
    result.email = email;
    result.birthdate = birthdate;
    result.nationality = nationality;
    result.age = age;
    await result.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al actualizar el usuario." });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({
      where: { userId: req.params.id },
    });

    if (result === 0) {
      return res.status(500).json({
        message: "no se encontro la informacion que desea eliminar",
        status: 500,
      });
    }

    return res.status(200).json({
      message: "El usuario fue eliminado exitosamente",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};