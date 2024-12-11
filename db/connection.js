import mongoose from "mongoose";

export let connectDB = async (dbString) => {
  try {
    await mongoose.connect(dbString);
    console.log("database connection established...");
  } catch (error) {
    console.log(
      "error occured while connection at connection.js" + error.message
    );
  }
};
