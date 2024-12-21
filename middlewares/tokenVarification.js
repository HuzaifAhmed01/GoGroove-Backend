import jwt from "jsonwebtoken";

export let varifyUserByToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Unauthorized user" });
    }
      await jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    console.log(
      "Error occurred at token verification middleware: " + error.message
    );
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
