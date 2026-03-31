const express = require('express')
const router = express.Router()
const TaxService = require('../controller/taxation.controller');

router.get("/getTaxation", (req, res) => {
    TaxService.getTaxation().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveTaxation", async (req, res) => {
    try {
        let data = await TaxService.addTaxation(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateTaxation/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await TaxService.updateTaxation(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



module.exports = router