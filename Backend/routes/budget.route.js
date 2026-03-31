const express = require('express')
const router = express.Router()
const BudgetService = require('../controller/budget.controller');

router.get("/getBudget", (req, res) => {
    BudgetService.getBudgetData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveBudget", async (req, res) => {
    try {
        let data = await BudgetService.addBudgetData(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateBudget/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await BudgetService.updateBudget(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete("/deleteBudget/:id", async (req, res) => {
    try {
        const deletedBook = await BudgetService.deleteOne({ _id: req.params.id });
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