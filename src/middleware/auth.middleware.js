import { verifyToken } from "../helpers/generateToken.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    if (tokenData.userId) {
      next();
    }
  } catch (error) {
    res.status(409).json({ message: "Invalid authorization" },{error: error.message});
  }
};
