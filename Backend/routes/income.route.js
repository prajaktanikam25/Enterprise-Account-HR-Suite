const express = require('express')
const router = express.Router()
const IncomeService = require('../controller/income.controller');
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

router.get("/emp-income-count", async (req, res) => {
    await IncomeService.empMonthWiseIncome(req.query.org).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/monthwise-report", async (req, res) => {
    await IncomeService.monthWiseCount(req.query.org).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post('/import', upload.single("excel-file"), async (req, res) => {
    await IncomeService.importIncomeDataUsingExcelFile('./uploads/' + req.file.filename).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
});

router.get("/getIncome", (req, res) => {
    IncomeService.getIncome(req.query).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveIncome", async (req, res) => {
    try {
        let data = await IncomeService.addIncome(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateIncome/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await IncomeService.updateIncome(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



module.exports = router