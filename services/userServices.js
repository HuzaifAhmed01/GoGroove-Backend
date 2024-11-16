import userModel from "../model/userModel.js";

//for user Create
export let userCreateService = async (firstName,lastName,email, password, phone) => {
  try {
    // FINDING USER IF ALREADY EXIST
    let user = await userModel.findOne({ email });

    if (user) {
      //RETURNING ERROR TO CONTROLLER IF EXIST
      return "error";
    } else {
      // CREATING NEW USER IF USER NOT FOUND
      let newUser = await userModel({ name, email, password, phone });
      let savedUser = await newUser.save();
      return "success";
    }
  } catch (error) {
    console.log(
      "error occurred while creating user at services: " + error.message
    );
    return error;
  }
};

//For finding user for Email
export let findingUserByEmail = async (email) => {
  try {
    //Finding user via email
    let user = await userModel.findOne({ email });
    //Returning user's password by following condition
    if (user) {
      return user;
    }
  } catch (error) {
    //Error Handeling
    console.log("error occured while logging user at services" + error.message);
  }
};

// for updating user password
export let passwordUpdatingService = async (email, newPassword) => {
  try {
    // finding by email and update password
    let updatingData = await userModel.findOneAndUpdate(
      { email },
      { password: newPassword }
    );
    if (updatingData) {
      console.log("password changed");
      return true;
    }
  } catch (error) {
    console.log(
      `error occured while updating user newPassword at services : ${error.message}`
    );
  }
};
