import { User } from "../models/user.js";
import { picture } from "../models/picture.js";
import { calendar } from "../models/calendar.js";
import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";
import { tasks } from "../models/tasks.js";
import { generateToken, verifyToken } from "../helpers/generateToken.js";
import { hashPassword, comparePassword } from "../helpers/passwordUtils.js";
import { sendMail } from "../helpers/emailer.js";

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
    const result = await User.findByPk(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, birthdate, age, nationality } =
      req.body;
    const encrypted = await hashPassword(password);
    const newUser = await User.create({
      name: name,
      lastName: lastName,
      email: email,
      password: encrypted,
      birthdate: birthdate,
      age: age,
      nationality: nationality,
    });
    const token = await generateToken(newUser);
    sendMail(newUser,token);
    res.status(201).json({ newUser: newUser, token: token });
  } catch (error) {
    res
      .status(400)
      .json({ message: "no se pudo crear al usuario", error: error.message });
  }
};
export const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultUser = await User.findOne({ where: { email: email } });
    if (!resultUser) {
      res
        .status(404)
        .json({ message: "Usuario con este correo no encontrado" });
    } else {
      if (comparePassword(password, resultUser.password)) {
        const token = await generateToken(resultUser);
        res.status(200).json({ resultUser, token });
      } else {
        res.status(400).json({ message: "contraseña incorrecta" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const upgrateUser = async (req, res) => {
  try {
    const { name, lastName, email, birthdate, nationality, age } = req.body;
    const result = await User.findByPk(req.params.id);
    if (result === null) {
      throw new Error("El ID no existe.");
    }
    result.name = name;
    result.lastName = lastName;
    result.email = email;
    result.birthdate = birthdate;
    result.age = age;
    result.nationality = nationality;
    await result.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: "El usuario no se pudo actualizar",
      error: error.errors[0].message,
    });
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

export const apiComplete = async (req, res) => {
  try {
    const result = await User.findAll({
      include: [
        { model: picture },
        {
          model: calendar,
          include: [
            {
              model: cell,
              include: [
                {
                  model: image,
                },
                { model: tasks },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "error interno", error: error.message });
  }
};

export const checkMailboxStatus = async (req,res) => {
  
  try {

    const { token } = req.params;
  

    if (typeof token !== "string") {
      throw new Error("Invalid token format");
    }

    const user = await verifyToken(token);

 
    if (!user) {
      throw new Error("Invalid token");
    }

    const resultUser = await User.findOne({ where: { email: user.email } });

  
    if (!resultUser) {
      throw new Error("User not found");
    }
    resultUser.checkEmail = true;
    await resultUser.save();

    const htmlResponse = '<h1>¡Hola!</h1>';
    res.send(htmlResponse);

  } catch (error) {
    return res.status(400).json({
      message: "Error validating email",
      error: error,
    });
  }
};
