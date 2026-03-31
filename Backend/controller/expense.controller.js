const ExpenseModel = require('../model/expense.model');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs')

async function monthWiseCount(org) {
    let matchCondition = { $match: { organization: org, status: "Approved" } }
    let matchCondition1 = { $match: { status: "Approved" } }
    let groupCondition = {
        $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            total_expense_month: { $sum: "$amount" },
        }
    }
    let sortCondition = {
        $sort: {
            _id: 1
        }
    }
    let projectCondition = {
        $project: {
            "_id": 0,
            "year": "$_id.year",
            "month": "$_id.month",
            "total_expense_month": "$total_expense_month"
        }
    }
    let pipeline = org ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let expense = await ExpenseModel.aggregate(pipeline)
    return expense
}

async function importExpenseDataUsingExcelFile(excelFile) {
    try {
        console.log(excelFile)
        const result = excelToJson({
            sourceFile: excelFile,
            header: {
                // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
                rows: 1 // 2, 3, 4, etc.
            },
            columnToKey: {
                A: 'purpose',
                B: 'category',
                C: 'amount',
                D: 'remark',
                E: 'paymentMode',
                F: 'date',
                G: 'organization',
                H: 'department',
            }
        });
        var data = []
        console.log(result)
        for (var i = 0; i < result.Sheet1.length; i++) {
            // result.Sheet1[i].organization = "ItechMentor"
            result.Sheet1[i].approved = "Sunil Bengade"
            result.Sheet1[i].status = "Waiting"
            result.Sheet1[i].isDeleted = 0
            var response = await addExpense(result.Sheet1[i])
            data = data.concat(response)
        }
        fs.unlinkSync(excelFile);
        return data
    } catch (err) {
        throw err
    }
}

async function getExpense(name, search) {
    try {
        // if (name) {
        //     let ExpenseData = await ExpenseModel.find({ organization: name }).sort({ createdAt: -1 })
        //     console.log(ExpenseData)
        //     return ExpenseData
        // }
        // else {
        //     let ExpenseData = await ExpenseModel.find().sort({ createdAt: -1 })
        //     console.log(ExpenseData)
        //     return ExpenseData
        // }
        if (name && search) {
            let ExpenseData = await ExpenseModel.find({ organization: name, purpose: search }).sort({ createdAt: -1 })
            console.log(ExpenseData)
            return ExpenseData
        }
        else if (name) {
            let ExpenseData = await ExpenseModel.find({ organization: name }).sort({ createdAt: -1 })
            console.log(ExpenseData)
            return ExpenseData
        }
        else if (search) {
            //$or: [{ purpose: new RegExp(search) }, { date: new RegExp(ISODate(search)) }]
            let ExpenseData = await ExpenseModel.find({ $or: [{ purpose: new RegExp(search) }, { organization: new RegExp(search) }, { category: new RegExp(search) }, { department: new RegExp(search) }, { status: new RegExp(search) }] }).sort({ createdAt: -1 })
            console.log(search)
            return ExpenseData
        }
        else {
            let ExpenseData = await ExpenseModel.find().sort({ createdAt: -1 })
            console.log(ExpenseData)
            return ExpenseData
        }
    } catch (error) {
        console.log(error)
    }
}

async function addExpense(trans) {
    try {
        let Tran = new ExpenseModel(trans)
        let ExpenseData = await Tran.save(trans)
        console.log(ExpenseData)
        return ExpenseData
    } catch (error) {
        console.log(error)
    }
}

async function updateExpense(id, expense) {
    try {
        let response = await ExpenseModel.updateOne({ _id: id }, expense)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteTransaction(catId) {
    try {
        let res = await ExpenseModel.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getExpense,
    addExpense,
    monthWiseCount,
    updateExpense,
    importExpenseDataUsingExcelFile,
    deleteTransaction
}