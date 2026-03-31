const express = require('express')
const router = express.Router()
const ReportService = require('../controller/report.controller');

router.get("/getDeductReport", (req, res) => {
    ReportService.getReport().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveDeductReport", async (req, res) => {
    try {
        let data = await ReportService.addReport(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateDeductReport/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ReportService.updateReport(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete("/deleteDeductReport/:id", async (req, res) => {
    try {
        const deletedBook = await ReportService.deleteOne({ _id: req.params.id });
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