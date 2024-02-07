const dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    DB: 'test',
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


