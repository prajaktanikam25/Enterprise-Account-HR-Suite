const express = require('express')
const router = express.Router()
const LoanService = require('../controller/loan.controller');

router.get("/getLoan", (req, res) => {
    LoanService.getLoanData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveLoan", async (req, res) => {
    try {
        let data = await LoanService.addLoan(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateLoan/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await LoanService.updateLoan(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete("/deleteLoan/:id", async (req, res) => {
    try {
        const deletedBook = await LoanService.deleteOne({ _id: req.params.id });
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