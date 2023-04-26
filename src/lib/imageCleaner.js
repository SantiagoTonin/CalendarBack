import fs from "fs";
import path from "path";
import { image } from "../models/imagen.js";


export function clean(active) {
  if (active === true) {
    console.log("me ejecute")
    const imagesPath = path.join(process.cwd(), "images");
    deleteUnregisteredImages(imagesPath);
  }
}

async function deleteUnregisteredImages(directory) {
  // Obtener la lista de nombres de imágenes registradas en la base de datos
  const images = await image.findAll();
  const registeredNames = images.map((image) => image.name);

  const unlinkPromises = [];

  // Obtener la lista de archivos en el directorio
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const fileName = path.basename(filePath);
      console.log(fileName)
      console.log(registeredNames)

      // Si el archivo no está registrado en la base de datos, eliminarlo
      if (!registeredNames.includes(fileName)) {
        unlinkPromises.push(
          new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
              if (err) reject(err);
              else {
                console.log(`Archivo ${filePath} eliminado.`);
                resolve();
              }
            });
          })
        );
      }
    });

    Promise.all(unlinkPromises).then(() => {
      console.log("Eliminación de archivos completa.");
    });
  });
}



