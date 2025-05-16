import Employee from '../models/Employee.js'
import Department from '../models/Department.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'



const storage= multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'public/uploads/')
    },

    filename : (req,file,cb)=>{
        cb(null,Date.now() + '-' + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage})

const addEmployee = async (req, res) => {
    try {
    const {
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
    } = req.body;
    console.log(req.body);


    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({success: false, error: "User already registered in emp" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage : req.file ? req.file.filename : "",
        });
       const savedUser= await newUser.save();

        const newEmployee = new Employee({
           userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
            });

            await newEmployee.save();
            return res.status(200).json({success: true, message: "Employee added successfully" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({success: false, error: " server error  in add employee" });
            }

}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId',{password:0}).populate('department');
        return res.status(200).json({success: true,employees});
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({success: false, error: " server error  in get employee" });
    }
}


const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById({_id:id}).populate('userId',{password:0}).populate('department');
        return res.status(200).json({success: true,employee});
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({success: false, error: " server error  in get employee" });
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id});
        if (!employee) {
            return res.status(404).json({success: false, error: "employee not found" });
        }

        const user = await User.findById({_id: employee.userId});
        if (!user) {
            return res.status(404).json({success: false, error: "user not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            {_id: employee.userId},
            {
                name
            }
        );
        const updatedEmployee = await Employee.findByIdAndUpdate(
            {_id: id},
            {
                maritalStatus,
                designation,
                department,
                salary
            }
        );

        if(!updateEmployee || !updatedUser){
            return res.status(404).json({success: false, error: "document not updated" });
        }
        return res.status(200).json({success: true, message: "Employee updated successfully" });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({success: false, error: " server error  in update employee" });
    }
}




export { addEmployee , upload, getEmployees, getEmployee,updateEmployee}