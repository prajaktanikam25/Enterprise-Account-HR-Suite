const Deduction = require('../model/deduction.model');

async function getDeductionData() {
    try {
        let DeductionData = await Deduction.find({})
        console.log(DeductionData)
        return DeductionData
    } catch (error) {
        console.log(error)
    }
}

async function addDeductionData(data) {
    try {
        let DeductionModel = new Deduction(data)
        let DeductionData = await DeductionModel.save(data)
        console.log(DeductionData)
        return DeductionData
    } catch (error) {
        console.log(error)
    }
}

async function updateDeduction(id, deduction) {
    try {
        let response = await Deduction.updateOne({ _id: id }, deduction )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteDeduction(id) {
    try {
        let res = await Deduction.remove({ _id: id })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDeductionData,
    addDeductionData,
    updateDeduction,
    deleteDeduction
}