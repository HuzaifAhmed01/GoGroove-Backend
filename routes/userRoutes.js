import express from "express";
import { passwordChangeController, passwordUpdatingController, userCreateController, userLoginController } from "../controllers/userController.js";
import { varifyUserByToken } from "../middlewares/tokenVarification.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", userCreateController);
userRoutes.post("/userLogin",userLoginController);
userRoutes.post("/forget-Password",passwordUpdatingController);
userRoutes.post("/changePassword",varifyUserByToken,passwordChangeController);

export default userRoutes;
