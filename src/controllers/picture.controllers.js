import { picture } from "../models/picture.js";
import { formatBytes } from "../helpers/converter.js";

export const getPictures = async (req, res) => {
  try {
    const result = await picture.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "no se pudo traer la lista " });
  }
};
export const getPicture = async (req, res) => {
  try {
    const result = await picture.findByPk({ pictureId: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "La imagen no existe", error: error });
  }
};
export const createPicture = async (req, res) => {
  try {
    const { originalname, mimetype, path, size } = req.file;
    const { userId } = req.body;
    console.log(userId);
    if (!userId) {
      throw new Error("el user Id no puede ser null");
    }
    const resImage = picture.create({
      name: originalname,
      path: path,
      mime: mimetype,
      imageSize: formatBytes(size),
      userId: userId,
    });

    res.status(200).json({ message: "La imagen se subio correctamente" });
  } catch (error) {
    res.status(400).json({
      message: "Imagen rechazada",
      error: error.message,
    });
  }
};
export const upgratePicture = async (req, res) => {
  res.json({ message: "imagen no se puede actualizar" });
};
export const DeletePictures = async (req, res) => {
  try {
    await image.destroy({ where: { path: req.params.path } });
    const rutaImagen = req.params.path;
    console.log(rutaImagen);
    fs.unlink(rutaImagen, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al eliminar la imagen");
      } else {
        res.status(200).send("Imagen eliminada correctamente");
      }
    });
    res.status(200);
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "La ruta enviada no es correcta" });
  }
};
