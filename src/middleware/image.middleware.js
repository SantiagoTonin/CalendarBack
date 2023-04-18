import multer from "multer";
import path from "path";

const fs = require('fs');
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
export const upload = multer({ storage: storage });