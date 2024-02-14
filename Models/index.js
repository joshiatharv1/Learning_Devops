import dbConfig from "../Config/databaseCon.js";
import { Sequelize, DataTypes} from "sequelize";
import UserModel from "../Models/user.js";
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db holds the reference as it is the object 
//UserModel is a function that will make the table 


db.User = UserModel(sequelize, DataTypes);

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronization completed');
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });

export default db;