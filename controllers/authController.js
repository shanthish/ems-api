import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success:false,message: "User not found" });
            // console.log("User not found aama da dai" );
        }
        console.log("user checked")
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Wrong password"});
        }

        const token=jwt.sign({_id:user._id,role:user.role},"my-secret-key",{expiresIn:"10d"});
        console.log("Login success");
        res.status(200).json({success:true,message:"Login success",token,user:{_id:user._id,name:user.name,role:user.role}});

}catch(error){
    // console.log(error);
    res.status(500).json({success:false,message:"Internal server error"});
}
}
const verify=(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}
export {login,verify}