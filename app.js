import express from "express";
import { config as configDotenv } from "dotenv";
import router from "./Routes/user-routes.js";
import healthrouter from "./Routes/health-routes.js";
import { handleRouteErrors } from "./Middlewares/route-errors.js"; 

configDotenv();
const app = express();
app.use(express.json());


app.use('/v1/user', router); 
app.use('/healthz', healthrouter); 

app.use(handleRouteErrors); 

app.get('/', (req, res)=>{
  res.send({
    message:'working'
  })
})

const server = app.listen(process.env.APP_PORT, () => {
  console.log("Server is up and Running ", process.env.APP_PORT);
});

export const closeServer = () => {
  server.close();
};

export default app;