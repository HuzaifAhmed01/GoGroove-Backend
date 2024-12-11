import userModel from "../model/userModel.js";

//for user Create
export let userCreateService = async (
  firstName,
  lastName,
  email,
  password,
  phone
) => {
  try {
    let user = await userModel.findOne({ email });

    if (!user) {
    
      let newUser = await userModel({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      let savedUser = await newUser.save();
      return savedUser;
    }
  } catch (error) {
    console.log(
      "error occurred while creating user at services: " + error.message
    );
    return error;
  }
};

export let findingUserByEmail = async (email) => {
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return user;
    }
  } catch (error) {
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
