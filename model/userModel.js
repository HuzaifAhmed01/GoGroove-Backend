import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Object,
    default: () => ({
      Date: new Date().toLocaleDateString(),
      Time: new Date().toLocaleTimeString()
    })
  },
  phone: {
    type: String,
    require: true,
  },
});

const userModel =mongoose.model("User", userSchema);

export default userModel;

