import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin","employee"],
        required: true
    },
    profileImage:{
        type: String,
        // default: "https://res.cloudinary.com/dkkgmzpk0/image/upload/v1624480153/employee/employee_1.jpg"
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema);
export default User;