export const checkMaxImages = (req, res, next) => {
  if (req.files && req.files.length > 3) {
    return res.status(400).json({ error: "Se ha superado el número máximo de imágenes permitidas (3)." });
  }
  next();
};