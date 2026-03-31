const IncomeModel = require('../model/income.model');
const TaxModel = require('../model/taxation.model');

const excelToJson = require('convert-excel-to-json');
const fs = require('fs')

async function empMonthWiseIncome(org) {
    let matchCondition = { $match: { organization: org } }
    let matchCondition1 = { $match: { status: "Received" } }
    let groupCondition = {
        $group: {
            _id: { employee: "$employee", year: { $year: "$date" }, month: { $month: "$date" } },
            total_income_month: { $sum: "$totalAmount" },
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
            "employee": "$_id.employee",
            "total_income": "$total_income_month",
        }
    }
    let pipeline = org ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let income = await IncomeModel.aggregate(pipeline)
    return income
}

async function monthWiseCount(org) {
    let matchCondition = { $match: { organization: org, status: "Received" } }
    let matchCondition1 = { $match: { status: "Received" } }
    let groupCondition = {
        $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            total_income_month: { $sum: "$totalAmount" },
            total_gst_income: { $sum: "$gstAmount" },
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
            "total_income_month": "$total_income_month",
            "total_gst_income": "$total_gst_income"
        }
    }
    let pipeline = org ? [matchCondition, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let income = await IncomeModel.aggregate(pipeline)
    return income
}

async function getIncome(queryParams) {
    // const page = parseInt(queryParams.page) || 1;
    // const limit = 100;
    // const skip = (page - 1) * limit;
    try {
        if (queryParams.name && queryParams.search) {
            var TransData = await IncomeModel.find({ organization: queryParams.name, purpose: queryParams.search }).sort({ createdAt: -1 });
            // var totalDocument = await IncomeModel.find({ organization: queryParams.name, purpose: queryParams.search }).sort({ createdAt: -1 })
        }
        else if (queryParams.name) {
            var TransData = await IncomeModel.find({ organization: queryParams.name }).sort({ createdAt: -1 });
            // var totalDocument = await IncomeModel.find({ organization: queryParams.name }).sort({ createdAt: -1 })
        }
        else if (queryParams.search) {
            //$or: [{ purpose: new RegExp(search) }, { date: new RegExp(ISODate(search)) }]
            var TransData = await IncomeModel.find({
                $or: [{ purpose: new RegExp(queryParams.search) },
                { organization: new RegExp(queryParams.search) },
                { category: new RegExp(queryParams.search) },
                { department: new RegExp(queryParams.search) },
                { status: new RegExp(queryParams.search) }]
            }).sort({ createdAt: -1 })

            // var totalDocument = await IncomeModel.find({
            //     $or: [{ purpose: new RegExp(queryParams.search) },
            //     { organization: new RegExp(queryParams.search) },
            //     { category: new RegExp(queryParams.search) },
            //     { department: new RegExp(queryParams.search) },
            //     { status: new RegExp(queryParams.search) }]
            // }).sort({ createdAt: -1 })
        }
        else {
            var TransData = await IncomeModel.find().sort({ createdAt: -1 })
            // var totalDocument = await IncomeModel.find().sort({ date: -1 })
        }
        // let no_of_pages = Math.ceil(totalDocument.length / 100)
        return { data: TransData }
    } catch (error) {
        console.log(error)
    }
}

async function importIncomeDataUsingExcelFile(excelFile) {
    try {
        console.log(excelFile)
        const result = excelToJson({
            sourceFile: excelFile,
            header: {
                // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
                rows: 1 // 2, 3, 4, etc.
            },
            columnToKey: {
                A: 'organization',
                B: 'department',
                C: 'purpose',
                D: 'companyName',
                E: 'clientName',
                F: 'paymentMode',
                G: 'invoiceNo',
                H: 'gst',
                I: 'totalAmount',
                J: 'paidAmount',
                K: 'pendingAmount',
                L: 'employee',
                M: 'date',
            }
        });
        var data = []
        console.log(result)
        for (var i = 0; i < result.Sheet1.length; i++) {
            // result.Sheet1[i].organization = "ItechMentor"
            // result.Sheet1[i].department = "Tech"
            result.Sheet1[i].status = "Waiting"
            result.Sheet1[i].isDeleted = 0
            var response = await addIncome(result.Sheet1[i])
            data = data.concat(response)
        }
        fs.unlinkSync(excelFile);
        return data
    } catch (err) {
        throw err
    }
}

async function addIncome(trans) {
    try {
        let Tran = new IncomeModel(trans)
        let TransData = await Tran.save(trans)
        let Tax = new TaxModel(trans)
        let TaxData = await Tax.save(trans)
        return { TransData, TaxData }
    } catch (error) {
        console.log(error)
    }
}

async function updateIncome(trans_id, transaction) {
    try {
        let response = await IncomeModel.updateOne({ _id: trans_id }, transaction)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteIncome(catId) {
    try {
        let res = await UserModel.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getIncome,
    addIncome,
    monthWiseCount,
    updateIncome,
    deleteIncome,
    importIncomeDataUsingExcelFile,
    empMonthWiseIncome
}