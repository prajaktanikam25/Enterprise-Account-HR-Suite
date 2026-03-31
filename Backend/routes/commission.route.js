const express = require('express')
const router = express.Router()
const CommissionService = require('../controller/commission.controller');

router.get("/getCommission", (req, res) => {
    CommissionService.getCommissionData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveCommission", async (req, res) => {
    try {
        let data = await CommissionService.addCommissionData(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateCommission/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await CommissionService.updateCommission(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



router.delete("/deleteCommission/:id", async (req, res) => {
    try {
        const deletedCommission = await CommissionService.deleteOne({ _id: req.params.id });
        if (!deletedCommission) {
            return res.status(404).json({ message: 'Commission not found' });
        }
        res.status(200).json({ message: 'Commission deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router