const Loan = require('../model/loan.model')

async function getLoanData() {
    try {
        let loanData = await Loan.find({})
        console.log(loanData)
        return loanData
    } catch (error) {
        console.log(error)
    }
}

async function addLoan(data) {
    try {
        let LoanModel = new Loan(data)
        let LoanData = await LoanModel.save(data)
        console.log(LoanData)
        return LoanData
    } catch (error) {
        console.log(error)
    }
}

async function updateLoan(deptId, department) {
    try {
        let response = await Loan.updateOne({ _id: deptId }, department)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteLoan(deptId) {
    try {
        let res = await Loan.remove({ _id: deptId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLoanData,
    addLoan,
    updateLoan,
    deleteLoan
}