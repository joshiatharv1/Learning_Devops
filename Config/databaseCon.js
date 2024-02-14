import { config as configDotenv } from "dotenv";
configDotenv();
const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.MYSQL_DB,
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  };
  
  export default dbConfig;

//We keep our connection details in pool so that we can call different funcitons on sql on diffrent places.


