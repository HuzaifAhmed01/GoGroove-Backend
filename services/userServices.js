import userModel from "../model/userModel.js";

//for user Create

export let userCreateService = async (data) => {
  try {
    let user = await userModel.findOne({ email: data.email });

    if (user) {
      return { message: "User already exists" };  // Return a meaningful response
    }

    let newUser = await userModel({ ...data });
    let savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.log(
      "Error occurred while creating user at services: " + error.message
    );
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
