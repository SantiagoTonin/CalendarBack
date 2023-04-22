import fs from 'fs';


export const deleteImage = (req, res, next) => {
  res.on("finish", () => { 
    if (res.statusCode >= 400) { 
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  next();
};
