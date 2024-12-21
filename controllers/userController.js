import { comparePasswords, HashPassword } from "../authentication/crypt.js";
import { generatingToken } from "../authentication/jwt.js";
import generatingId from "../helpers/IdGenerator.js";
import { sendingEmailToUser } from "../helpers/sendEmail.js";
import {
  findingUserByEmail,
  passwordUpdatingService,
  userCreateService,
} from "../services/userServices.js";

//For SignUp
export let userCreateController = async (req, res) => {
  let { firstName, lastName, email, password, phone } = req.body;

  try {
    let hashedPassword = await HashPassword(password);
    req.body.password = hashedPassword;

    let userId = generatingId("USER");
    let user = await userCreateService({
      userId,
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    if (user.message) {
      return res.status(409).json({ success: false, message: user.message });
    }

    let token = generatingToken(user.email);  // Assuming this generates a valid token
    sendingEmailToUser(user.email, user.firstName);
    return res.status(201).json({ success: true, token, name: user.firstName });
  } catch (error) {
    console.error("Error occurred in userCreateController: " + error.message);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


//For Login
export let userLoginController = async (req, res) => {
  //Destructring user Details
  let { email, password } = req.body;

  try {
    let DBPassword = await findingUserByEmail(email);
    let newPassword = password;

    let comparePassword = await comparePasswords(
      newPassword,
      DBPassword.password
    );

    if (comparePassword) {
      // Generating Token
      let token = generatingToken(email);
      res.status(200).send("Login Successful :  " + token);
    } else {
      res.status(400).send("Invalid Email or Password");
    }
  } catch (error) {
    console.log(
      "error occured while loging user from controllers" + error.message
    );
  }
};
//For forget password
export let passwordUpdatingController = async (req, res) => {
  let { email, password } = req.body;

  try {
    let Hashed = await HashPassword(password);
    let UpdatedPassword = await passwordUpdatingService(email, Hashed);
    if (UpdatedPassword) {
      res.send("password updated successfully");
    } else {
      res.send("could'nt update password");
    }
  } catch (error) {
    console.log(
      "error occures while updating password at controllers" + error.message
    );
  }
};

//For Change Password
export let passwordChangeController = async (req, res) => {
  let { email, oldPassword, newPassword } = req.body;
  // console.log(email, oldPassword, newPassword);
  try {
    //Finding previousely entered password
    let DBPassword = await findingUserByEmail(email);
    // console.log(DBPassword);

    let compare = await comparePasswords(oldPassword, DBPassword);

    if (compare) {
      // For convert password into Hash form
      let HashedPassword = await HashPassword(newPassword);
      //Passing into the services to updated password
      let updatingPassword = await passwordUpdatingService(
        email,
        HashedPassword
      );

      // some validations for right responses
      if (updatingPassword) {
        res.status(200).json({ message: "password changed successfully" });
      } else {
        res.status(401).json({ message: "Invalid Email or Password" });
      }
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.log("error occured at controllers" + error.message);
  }
};
