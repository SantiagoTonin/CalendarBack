import fs from "fs";
import path from "path";
const {image} = require('../models/imagen.js'); 

async function deleteUnregisteredImages(directory) { // hay q pasarle el directorio donde estan guardadas las imagenes
  const images = await image.findAll(); 
  const imageNames = image.map(images => images.name); 

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      
      if (!imageNames.includes(file)) {
        fs.unlink(filePath, err => {
          if (err) throw err;
          console.log(`Archivo ${filePath} eliminado.`);
        });
      }
    });
  });
}

