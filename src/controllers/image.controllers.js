import { image } from "../models/imagen.js";
import { formatBytes } from "../helpers/converter.js";
import fs from "fs";





export const getImages = async (req, res, next) => {
  try {
    const results = await image.findAll();
    res.json(results);
  } catch (error) {
    res.status(500);
  }
};
export const getImage = async (req, res, next) => {
  try {
    const result = await image.findByPk(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};
export const createImages = async (req, res, next) => {
  try {
    req.files.forEach((file) => {
      const { originalname, mimetype, path, size } = file;
      const {cellsId} = req.body;
      const resImage = image.create({
        name: originalname,
        path: path,
        mime: mimetype,
        imageSize: formatBytes(size),
        cellsId: cellsId
      }); 

    });
    res.json({message:"Se subio correctamente la imagen"});

  } catch (error) {
    res.json({ error: error });
  }
};

export const upgradeImages = async (req, res, next) => {
  try {
    for (const file of req.files) {
      const { path, mime, imageSize } = file;
      const imageToUpdate = await image.findByPk(req.params.id);
      imageToUpdate.path = path;
      imageToUpdate.mime = mime;
      imageToUpdate.imageSize = imageSize;
      await imageToUpdate.save();
    }

    res.status(200).json("se actualizo correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteImages = async (req, res, next) => {
  try {
    await image.destroy({ where: { path: req.params.path } });
    const rutaImagen = req.params.path
    console.log(rutaImagen);
    fs.unlink(rutaImagen, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la imagen');
      } else {
        res.status(200).send('Imagen eliminada correctamente');
      }
    });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error,message:"La ruta enviada no es correcta"});
  }
};
