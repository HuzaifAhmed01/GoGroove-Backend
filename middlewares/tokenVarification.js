import jwt from "jsonwebtoken";

export let varifyUserByToken = async (req, res, next) => {
  // Destructuring token from headers
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    //checking if token exist by condtions
    if (!token) {
      // passing error if token not exist
      res.status(404).json({ message: "Unauthorized user" });
    }
    //varifying token if exsit
    let verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    // checking token valid or not

    next();
  } catch (error) {
    console.log(
      "error occured at token Verification middleware : " + error.message
    );
  }
};
