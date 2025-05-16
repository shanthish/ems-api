import express from 'express'
import cors from 'cors'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import router from "./routes/auth.js"
import connectToDatabase from './db/db.js'
connectToDatabase();
const app = express()
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // or "*" for all origins (not recommended for production)
  credentials: true
}));
app.use(express.static('public/uploads'));
app.use('/api/auth',router)
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);



app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})