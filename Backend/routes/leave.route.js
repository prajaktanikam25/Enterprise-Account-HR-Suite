const express = require('express')
const router = express.Router()
const LeaveService = require('../controller/leave.controller');
const Leave = require('../model/leave.model');

router.get("/getLeave", (req, res) => {
    LeaveService.getLeaveData(req.query.empName, req.query.organization, req.query.search).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveLeave", async (req, res) => {
    try {
        let data = await LeaveService.addLeave(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateLeave/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await LeaveService.updateLeave(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete('/deleteLeave/:id', async (req, res) => {
    const studentId = req.params.id;

    // 4. Implement the delete functionality
    try {
        // Use Mongoose to delete the student document
        const result = await Leave.deleteOne({ _id: studentId });

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