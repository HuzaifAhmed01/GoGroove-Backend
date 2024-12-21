import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userID:{type:String,required:true,default:0},
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

const userModel =mongoose.model("user", userSchema);

export default userModel;

