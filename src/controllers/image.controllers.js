import { image } from "../models/imagen.js";

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
  const prueba = req.body;
  console.log(prueba);
};
export const upgradeImages = async (req, res, next) => {
  try {
    const { path, mime, imageSize } = req.body;
    const results = await image.findByPk(req.params.id);
    results.path = path;
    results.mime = mime;
    results.imageSize = imageSize;
    results.save();
    res.json(results);
  } catch (error) {
    res.status(500);
  }
};
export const deleteImages = async (req, res, next) => {
  try {
    await image.destroy({ where: { imageId: req.params.id } });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error});
  }
};
