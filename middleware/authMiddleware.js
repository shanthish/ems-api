// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// const verifyUser=async(req,res,next)=>{
//     try{
//         const token=req.headers.authorization.split(' ')[1];
//         if(!token){
//             return res.status(404).json({success:false,error:"token not provided"})
//         }

//         const decoded=jwt.verify(token,"my-secret-key");
//         if(!decoded){
//             return res.status(404).json({success:false,error:"token not valid"})
//         }
//         const user=await User.findById({_id:decoded._id}).select('-password')
//         if(!user){
//             return res.status(404).json({success:false,error:"user not found"})
//         }

//         req.user=user
//         next()
//     }catch(error){
//         return res.status(500).json({success:false,error:"server error"})
//     }
// }

// export default verifyUser;

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const verifyUser = async (req, res, next) => {
//     console.log("User in verify controller:", req.user);
//   try {
//     const authHeader = req.headers.authorization;
//     console.log("Authorization Header:", req.headers.authorization);

//     if (!authHeader) {
//       return res.status(404).json({ success: false, error: "Token not provided" });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(404).json({ success: false, error: "Token not valid" });
//     }

//     const decoded = jwt.verify(token, "my-secret-key");
//     if (!decoded) {
//       return res.status(404).json({ success: false, error: "Token not valid" });
//     }

//     const user = await User.findById(decoded._id).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Verification error:", error);
//     return res.status(500).json({ success: false, error: "Server error" });
//   }
// };

// export default verifyUser;


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const verifyUser = async (req, res, next) => {
//   try {
//     // Check for Authorization header
//     const authHeader = req.headers.authorization;
//     console.log("Authorization Header:", authHeader);  // Debugging the Authorization header
    
//     if (!authHeader) {
//       return res.status(401).json({ success: false, error: "Token not provided" });
//     }

//     // Extract token from 'Bearer <token>'
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ success: false, error: "Token format is invalid" });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, "my-secret-key");
//     console.log("Decoded token:", decoded); // Debugging decoded token

//     if (!decoded) {
//       return res.status(401).json({ success: false, error: "Token not valid" });
//     }

//     // Fetch the user based on decoded data
//     const user = await User.findById(decoded._id).select('-password');
//     console.log("User found:", user); // Debugging the user retrieved from DB

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     // Attach the user to the request object and proceed
//     req.user = user;
//     next();  // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error("Verification error:", error);  // Log error to the console
//     return res.status(500).json({ success: false, error: "Server error" });
//   }
// };

// export default verifyUser;

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);  // Debugging the Authorization header
    
    if (!authHeader) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Token format is invalid" });
    }

    // Verify the token
    const decoded = jwt.verify(token,"my-secret-key");
    console.log("Decoded token:", decoded); // Debugging decoded token

    if (!decoded) {
      return res.status(401).json({ success: false, error: "Token not valid" });
    }

    // Fetch the user based on decoded data
    const user = await User.findById(decoded._id).select('-password');
    console.log("User found:", user); // Debugging the user retrieved from DB

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Attach the user to the request object and proceed
    req.user = user;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    // Log the complete error to help debug
    console.error("Verification error:", error.message);  // Log error message
    console.error(error.stack);  // Log full error stack for better debugging

    // Send detailed error response
    return res.status(500).json({
      success: false,
      error: "Server error",
      details: error.message  // Provide error details for debugging
    });
  }
};

export default verifyUser;
