const express = require('express')
const router = express.Router()
const DepartmentService = require('../controller/department.controller');

router.get("/getDepartment", (req, res) => {
    DepartmentService.getDepartmentData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveDepartment", async (req, res) => {
    try {
        let data = await DepartmentService.addDepartment(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateDepartment/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await DepartmentService.updateDepartment(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



router.delete("/deleteDepartment/:id", async (req, res) => {
    try {
        const deletedBook = await DepartmentService.deleteOne({ _id: req.params.id });
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router