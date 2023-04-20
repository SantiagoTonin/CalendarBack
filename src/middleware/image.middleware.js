import multer from "multer";
import path from "path";
import fs from "fs";

const dir = './images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: path.resolve('./images'),
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error("Error: El archivo debe ser una imagen válida"));
  },
  array: "images"
});