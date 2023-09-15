import { User } from "../models/user.js";

export const createAdmin = async (req, res) => {
  try {
    const { userId, userRol } = req.body;
    const result = await User.findOne({ where: { userId: userId } });

    if (!result) {
      throw new Error("User not Exist");
    }

    if (result.rol === "superADMIN") {
      throw new Error("YOU CANNOT MODIFY AN superADMIN");
    }

    if (result.rol === "ADMIN") {
      throw new Error("YOU CANNOT MODIFY AN ADMIN BEING ADMIN");
    }

    result.rol = userRol;
    await result.save();

    res.status(200).send();
  } catch (error) {
    res.status(400).json({
      message: "El usuario no se pudo actualizar",
      error: error.message,
    });
  }
};
