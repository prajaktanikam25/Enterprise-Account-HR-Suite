const express = require('express')
const router = express.Router()
const DeductionService = require('../controller/deduction.controller');

router.get("/getDeduction", (req, res) => {
    DeductionService.getDeductionData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveDeduction", async (req, res) => {
    try {
        let data = await DeductionService.addDeductionData(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateDeduction/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await DeductionService.updateDeduction(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



router.delete("/deleteDeduction/:id", async (req, res) => {
    try {
        const deletedDeduction = await DeductionService.deleteOne({ _id: req.params.id });
        if (!deletedDeduction) {
            return res.status(404).json({ message: 'Deduction not found' });
        }
        res.status(200).json({ message: 'Deduction deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router