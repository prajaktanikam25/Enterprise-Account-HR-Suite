const express = require('express')
const router = express.Router()
const service = require('../controller/dashboard.controller')

router.get("/total-income", async (req, res) => {
    service.TotalIncomeCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/total-gst-count", async (req, res) => {
    service.TotalGSTAmountCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/report", async(req, res) => {
    await service.TotalReport(req.query.org).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})
router.get("/report-income", async(req, res) => {
    await service.TotalIncomeReport(req.query.org).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})
router.get("/report-expense", async(req, res) => {
    await service.TotalExpenseReport(req.query.org).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/total-pending-amt", async (req, res) => {
    service.TotalIncomePendingCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/total-income-purpose", async (req, res) => {
    service.TotalIncomePurposeWise(req.query.id).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/total-expense", async (req, res) => {
    service.TotalExpenseCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/total-expense-waiting", async (req, res) => {
    service.TotalExpenseWaitingCount(req.query.name).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/total-expense-purpose", async (req, res) => {
    service.TotalExpensePurposeWise(req.query.id).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/totalBudget", async (req, res) => {
    service.TotalBudgetCount(req.query.id).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

module.exports = router