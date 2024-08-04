// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const auth = async (req, res, next) => {
  const token = req.cookies._auth || req.headers["Authorization"];
  if (!token) {
    res.status(401).json("Token not found");
    throw new Error("Token not found");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id);
      // console.log(user);

      if (!user) {
        throw new Error();
      } else {
        req.user = user; // Attach user to the request object
        next();
      }
    } catch (err) {
      res.status(401).json({ msg: "Please authenticate" });
      console.log(err);
    }
  }
};

export default auth;
