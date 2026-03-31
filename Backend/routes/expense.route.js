const express = require('express')
const router = express.Router()
const ExpenseService = require('../controller/expense.controller')
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

router.post('/importExpense', upload.single("excel-file"), async (req, res) => {
    await ExpenseService.importExpenseDataUsingExcelFile('./uploads/' + req.file.filename).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/getExpense", (req, res) => {
    ExpenseService.getExpense(req.query.name, req.query.search).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/monthwise-report-expence", async (req, res) => {
    await ExpenseService.monthWiseCount(req.query.org).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveExpense", async (req, res) => {
    try {
        let data = await ExpenseService.addExpense(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateExpense/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ExpenseService.updateExpense(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



module.exports = router