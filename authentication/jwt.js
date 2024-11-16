import jwt from "jsonwebtoken";

export let generatingToken = (payload) => {
  try {
    let token = jwt.sign(payload,process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.log("error occured while token generate" + error.message);
  }
};
