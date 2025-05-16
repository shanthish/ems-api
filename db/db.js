import mongoose from "mongoose";

const connectToDatabase=async()=>{
  try{
    await mongoose.connect("mongodb+srv://shanthishsr2023cse:shanthishsr2023cse@cluster0.ob34m.mongodb.net/employeeDB?retryWrites=true&w=majority&appName=Cluster0")
  }catch(err){
    console.log(err)
  }
}

export default connectToDatabase; 