import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectToDatabase from "./db/db.js";
const userRegister = async (req, res) => {
    // const { name, email, password, role } = req.body;
    console.log("before conectin function")
    await connectToDatabase();
    console.log("after conectin function")
    try {
        const hashedPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });
        await newUser.save();
    } catch (error) {
        console.log(error);
    }

};

userRegister();