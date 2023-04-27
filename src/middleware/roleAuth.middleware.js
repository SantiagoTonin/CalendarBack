import { verifyToken } from "../helpers/generateToken.js";
import { User } from "../models/user.js";

export const authRoleAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await User.findByPk(tokenData.userId);
    if ([].concat("ADMIN").includes(userData.rol)) {
      next();
    }else{
      throw new Error("Invalid authorization");
    }
    
  } catch (error) {
    res.status(409).json({ error:error.message});
  }
};