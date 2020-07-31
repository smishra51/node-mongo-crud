import express from 'express';
import EmployeeController from '../controller/employee.controller.js';

let employee = new EmployeeController();
const router = express.Router();

router.get('/employee', (req,res) => {
    return employee.get(req,res)
});

router.post('/employee', (req,res) => {
    return employee.post(req,res)
});

router.put('/employee/:employeeId', (req,res) => {
    return employee.put(req,res)
});

router.delete('/employee/:employeeId', (req,res) => {
    return employee.delete(req,res)
});

export default router;