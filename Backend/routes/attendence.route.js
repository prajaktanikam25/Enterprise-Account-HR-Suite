const express = require('express')
const router = express.Router()
const AttendenceService = require('../controller/attendence.controller');
const Attendence = require('../model/attendence.model');

router.get("/getAttendence", (req, res) => {
    AttendenceService.getAttendenceRecord(req.query).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

// router.get("/getABSENT", (req, res) => {
//     AttendenceService.markAbsentEmployees().then(data => {
//         res.status(200).json(data)
//     }).catch(error => {
//         res.status(400).json(error)
//     })
// })

router.post("/saveAttendence", async (req, res) => {
    try {
        let data = await AttendenceService.addAttendenceRecord(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateAttendence/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await AttendenceService.updateAttendence(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

// router.delete('/students/:id', studentController.deleteStudent);


router.delete('/deleteAttendence/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const result = await Attendence.deleteOne({ _id: studentId });
        if (!result) {
            return res.status(404).json({ message: 'Attendence not found' });
        }

        return res.json({ message: 'Attendence deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router