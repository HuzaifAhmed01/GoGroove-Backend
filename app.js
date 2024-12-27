import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

//CONFIGURING DOTENV
dotenv.config();

// EXPRESS INSTENCE
const app = express();

// FOR PERSING DATA WITH BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//.ENV DATA
const port = process.env.PORT;
const dbString = process.env.DBSTRING;

//SETTING CORS
app.use(cors());

//CONNECTING TO DATABASE
connectDB(dbString);

// CREACTING ROUTES
app.use("/user", userRoutes);
app.use("/products", productRoutes);

// CREATING SERVER
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
