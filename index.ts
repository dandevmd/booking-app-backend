import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import {pool} from "./database";
import router from "./routes";
import cookieParser from "cookie-parser";

//check db conectivity
pool.connect().then(() => {
  console.log("connected to lama_booking database");
});


//initialize port
const PORT = process.env.PORT;

//initialize express
const app: Express = express();

//initialize middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser())

//initialize routes
app.use('/api/v1', router)


//listen on port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
