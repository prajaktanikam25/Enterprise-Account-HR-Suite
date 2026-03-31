const express = require('express')
const router = express.Router()
const salary = require('../controller/salary.controller')

router.get("/total-attendence", async (req, res) => {
    salary.TotalAttendenceCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})
router.get("/total-salary-count", async (req, res) => {
    salary.TotalSalaryCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

module.exports = router