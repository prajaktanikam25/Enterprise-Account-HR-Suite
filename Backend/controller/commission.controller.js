const Commission = require('../model/commission.model');

async function getCommissionData() {
    try {
        let CommissionData = await Commission.find({})
        console.log(CommissionData)
        return CommissionData
    } catch (error) {
        console.log(error)
    }
}

async function addCommissionData(data) {
    try {
        let CommissionModel = new Commission(data)
        let CommissionData = await CommissionModel.save(data)
        console.log(CommissionData)
        return CommissionData
    } catch (error) {
        console.log(error)
    }
}

async function updateCommission(CommId, commission) {
    try {
        let response = await Commission.updateOne({ _id: CommId }, commission )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteCommission(CommId) {
    try {
        let res = await Commission.remove({ _id: CommId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCommissionData,
    addCommissionData,
    updateCommission,
    deleteCommission
}