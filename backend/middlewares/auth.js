import { User } from "../Model/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // If no token found, send 401 Unauthorized
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "User Not Authorized" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "User Not Authorized" 
      });
    }

    // User is authenticated
    next();
  } catch (error) {
    // Token invalid or expired
    return res.status(401).json({ 
      success: false, 
      message: "Invalid Token" 
    });
  }//auth = verify identity
});
