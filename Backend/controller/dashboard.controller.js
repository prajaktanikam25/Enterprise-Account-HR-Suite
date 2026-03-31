const Income = require('../model/income.model')
const Expense = require('../model/expense.model')
const Budget = require('../model/budget.model')

function TotalIncomeCount(name) {
    let matchCondition = { $match: { organization: name, status: "Received" } }
    let matchCondition1 = { $match: { status: "Received" } }
    let groupCondition = {
        $group: {
            _id: "$organization", "count": { $sum: "$totalAmount" }
        }
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }
    let projectCondition = {
        $project: {
            "organization": "$_id",
            "RecievedAmount": "$count",
        }
    }
    let pipeline = name ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let total = Income.aggregate(pipeline)
    return total
}

async function TotalReport(org) {
    let matchCondition = { $match: { organization: org } }
    let groupCondition = {
        $group: {
            _id: {
                organization: "$organization",
                year: { $year: "$date" },
                month: { $month: "$date" }
            },
            expense: { $sum: "$amount" }
        }
    }
    let lookupCondition = {
        $lookup: {
            from: "incomes",
            let: {
                organization: "$_id.organization",
                year: "$_id.year",
                month: "$_id.month"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$organization", "$$organization"] },
                                { $eq: [{ $year: "$date" }, "$$year"] },
                                { $eq: [{ $month: "$date" }, "$$month"] }
                            ]
                        }
                    }
                },
                { $group: { _id: { organization: "$organization" }, total_income: { $sum: "$totalAmount" }, total_GST: { $sum: "$gstAmount" } } },

                {
                    $project: {
                        _id: 0,
                        total_income: "$total_income",
                        total_GST: "$total_GST",
                    }
                }
            ],
            as: "income"
        }
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }

    let pipeline = org ? [matchCondition, groupCondition, lookupCondition, sortCondition] : [groupCondition, lookupCondition, sortCondition]
    let expense = await Expense.aggregate(pipeline)
    return expense
}

async function TotalExpenseReport(org) {
    let matchCondition = { $match: { organization: org } }
    let groupCondition = {
        $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" }, organization: "$organization" },

            total_expense_month: { $sum: "$amount" },
        }
    }
    let sortCondition = {
        $sort: {
            _id: -1
        }
    }
    let projectCondition = {
        $project: {
            "_id": 0,
            "year": "$_id.year",
            "month": "$_id.month",
            "organization": "$_id.organization",
            "total_expense_month": "$total_expense_month"

        }
    }
    let pipeline = org ? [matchCondition, groupCondition, sortCondition, projectCondition] : [groupCondition, sortCondition, projectCondition]
    let expense = await Expense.aggregate(pipeline)
    return expense
}

async function TotalIncomeReport(org) {
    let matchCondition = { $match: { organization: org } }
    let groupCondition = {
        $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" }, organization: "$organization" },
            total_income_month: { $sum: "$totalAmount" },
            total_gst_income: { $sum: "$gstAmount" },
        }
    }
    let sortCondition = {
        $sort: {
            _id: -1
        }
    }
    let projectCondition = {
        $project: {
            "_id": 0,
            "year": "$_id.year",
            "month": "$_id.month",
            "organization": "$_id.organization",
            "total_income_month": "$total_income_month",
            "total_gst_income": "$total_gst_income",
            // "difference": {
            //     $subtract: ["$total_income_month", "$total_expense_month"]
            // }
        }
    }
    let pipeline = org ? [matchCondition, groupCondition, sortCondition, projectCondition] : [groupCondition, sortCondition, projectCondition]
    let income = await Income.aggregate(pipeline)
    return income
}


function TotalGSTAmountCount(name) {
    let matchCondition = { $match: { organization: name, status: "Received" } }
    let matchCondition1 = { $match: { status: "Received" } }
    let groupCondition = {
        $group: {
            _id: "$organization", "count": { $sum: "$gstAmount" }
        },
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }
    let projectCondition = {
        $project: {
            "organization": "$_id",
            "RecievedAmount": "$count",
        }
    }
    let pipeline = name ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let total = Income.aggregate(pipeline)
    return total
}

function TotalIncomePendingCount(name) {
    let matchCondition = { $match: { organization: name, status: "Waiting" } }
    let matchCondition1 = { $match: { status: "Waiting" } }
    let groupCondition = {
        $group: {
            _id: "$organization", "count": { $sum: "$totalAmount" }
        }
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }
    let projectCondition = {
        $project: {
            "organization": "$_id",
            "PendingAmount": "$count",
        }
    }
    let pipeline = name ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let total = Income.aggregate(pipeline)
    return total
}


function TotalIncomePurposeWise(id) {
    let matchCondition = { $match: { organization: id } }
    let groupCondition = {
        $group: {
            _id: "$department",
            // purpose:"$purpose",
            totalAmount: { $sum: "$totalAmount" }
        }
    }
    let projectCondition = {
        $project: {
            "_id": "$_id",
            "department": "$_id.department",
            "totalAmount": "$totalAmount",
            "organization": "$organization"
        }
    }
    let pipeline = id ? [matchCondition, groupCondition, projectCondition] : [groupCondition, projectCondition]
    let total = Income.aggregate(pipeline)
    return total
}

function TotalExpenseCount(name) {
    let matchCondition = { $match: { organization: name, status: "Approved" } }
    let matchCondition1 = { $match: { status: "Approved" } }
    let groupCondition = {
        $group: {
            _id: "$organization", "count": { $sum: "$amount" }
        }
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }
    let projectCondition = {
        $project: {
            "organization": "$_id",
            "expenseAmount": "$count",
        }
    }
    let pipeline = name ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let total = Expense.aggregate(pipeline)
    return total
}

function TotalExpenseWaitingCount(name) {
    let matchCondition = { $match: { organization: name, status: "Waiting" } }
    let matchCondition1 = { $match: { status: "Waiting" } }
    let groupCondition = {
        $group: {
            _id: "$organization", "count": { $sum: "$amount" }
        }
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }
    let projectCondition = {
        $project: {
            "organization": "$_id",
            "expenseAmount": "$count",
        }
    }
    let pipeline = name ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let total = Expense.aggregate(pipeline)
    return total
}
function TotalExpensePurposeWise(id) {
    let matchCondition = { $match: { organization: id } }
    let groupCondition = {
        $group: {
            _id: "$department",
            totalAmount: { $sum: "$amount" }
        }
    }
    let projectCondition = {
        $project: {
            "_id": "$_id",

            "TotalExpense": "$totalAmount"

        }
    }
    let pipeline = id ? [matchCondition, groupCondition, projectCondition] : [groupCondition, projectCondition]
    let total = Expense.aggregate(pipeline)
    return total
}
function TotalBudgetCount(id) {
    let matchCondition = { $match: { organization: id } }
    let groupCondition = {
        $group: {
            _id: {
                "organization": "$organization",
                "totalAmount": "$amount"
            }


        }
    }
    let projectCondition = {
        $project: {
            "_id": "$_id",
        }
    }
    let pipeline = id ? [matchCondition, groupCondition, projectCondition] : [groupCondition, projectCondition]
    let total = Budget.aggregate(pipeline)
    return total
}

module.exports = {
    TotalIncomeCount,
    TotalGSTAmountCount,
    TotalIncomePurposeWise,
    TotalIncomePendingCount,
    TotalExpenseWaitingCount,
    TotalExpenseCount,
    TotalExpensePurposeWise,
    TotalBudgetCount,
    TotalExpenseReport,
    TotalIncomeReport,
    TotalReport
}
