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
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se han subido imágenes." });
    }

    if (req.files && req.files.length > 10) {
      return res.status(400).json({ error: "Se permite un máximo de 10 imágenes" });
    }

    const { postId } = req.body;

    const imagePromises = req.files.map((file) => {
      const { originalname, mimetype, path, size } = file;

      // La URL debe ser construida en función de la carpeta donde se guardan las imágenes
      const imageUrl = `${req.protocol}://${req.get("host")}/image/${originalname}`; 

      return image.create({
        name: originalname,
        path: imageUrl, // Guarda la URL construida
        mime: mimetype,
        imageSize: formatBytes(size),
        postId: postId,
      });
    });

    await Promise.all(imagePromises);

    res.status(201).json({ message: "Se subieron correctamente las imágenes." });
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    res.status(500).json({ error: "Hubo un error al subir las imágenes." });
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
