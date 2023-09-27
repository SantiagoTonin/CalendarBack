import multer from "multer";
import path from "path";
import fs from "fs";

const dir = './ProfilePicture';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: path.resolve('./ProfilePicture'),
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de tamaño de 2 MB
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error("Error: El archivo debe ser una imagen válida"));
  },
});

// Middleware de manejo de errores global
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    console.log(err)
    return res.status(400).json({ message: "El tamaño de la imagen debe ser menor a 2 MB" });
  } else if (err) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
  next();
};