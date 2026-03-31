const express = require('express')
const router = express.Router()
const EmployeeService = require('../controller/employee.controller');
const User = require("../model/userMaster.model");
const bcrypt = require("bcrypt");
const Employee = require('../model/employee.model');

router.get("/getSalarySlip", (req, res) => {
    EmployeeService.getSalarySlip(req.query).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveSalary", async (req, res) => {
    try {
        let data = await EmployeeService.addSalarySlip(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateSalarySlip/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await EmployeeService.updateSalarySlip(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.get("/getEmployee", (req, res) => {
    EmployeeService.getEmployeeData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveEmployee", async (req, res) => {
    try {
        let data = await EmployeeService.addEmployee(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.firstName + "@12345", salt);
        const newUserLogin = new User({
            fname: req.body.firstName,
            lname: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobileNo,
            role: req.body.employeeType,
            userName: req.body.email,
            password: hashedPass,
            department: req.body.department,
            organization: req.body.organization,
        });
        const user1 = await newUserLogin.save();
        console.log(user1)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateEmployee/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await EmployeeService.updateEmployee(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete('/deleteEmp/:id', async (req, res) => {
    const studentId = req.params.id;

    // 4. Implement the delete functionality
    try {
        // Use Mongoose to delete the student document
        const result = await Employee.deleteOne({ _id: studentId });

        if (!result) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router