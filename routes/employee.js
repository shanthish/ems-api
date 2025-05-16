
import express from 'express'
// import authMiddleware from '../middleware/authMiddlware.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee ,upload,getEmployees,getEmployee,updateEmployee} from '../controllers/employeeController.js'


const router =express.Router()

router.post('/add', authMiddleware,upload.single('image'), addEmployee)
router.get('/', authMiddleware, getEmployees)
router.put('/:id', authMiddleware, updateEmployee)
router.get('/:id', authMiddleware, getEmployee)
// router.delete('/:id', authMiddleware, deleteDepartment)

export default router;