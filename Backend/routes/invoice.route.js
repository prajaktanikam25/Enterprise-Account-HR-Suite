const express = require('express')
const router = express.Router()
const InvoiceService = require('../controller/invoice.controller');

router.get("/getInvoice", (req, res) => {
    InvoiceService.getInvoice().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveInvoice", async (req, res) => {
    try {
        let data = await InvoiceService.addInvoice(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateInvoice/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await InvoiceService.updateInvoice(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



module.exports = router