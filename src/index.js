import app from "./app.js";
import { sequelize } from "./database/database.js";
import { clean } from "./lib/imageCleaner.js";
import {config} from "dotenv";


async function main() {
try {
  await sequelize.sync({alter:false});
  app.listen(4000);
  console.log("server listening on port 4000");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}}

config()
// clean(true); //funcion para limpiar la carpeta de imagenes no registradas en la base de datos
main();

