import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors'

//CONFIGURING DOTENV
dotenv.config();

// EXPRESS INSTENCE
const app = express();

//.ENV DATA
const port = process.env.PORT;
const dbString = process.env.DBSTRING;
const dbName = process.env.DBNAME;

//SETTING CORS
app.use(cors());

// FOR PERSING DATA WITH BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//CONNECTING TO DATABASE
connectDB(dbString, dbName);

// CREACTING ROUTES
app.use("/user", userRoutes);

// CREATING SERVER
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
