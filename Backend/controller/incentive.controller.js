const Incentive = require('../model/incentive.model');

async function getIncentiveData() {
    try {
        let Data = await Incentive.find({})
        console.log(Data)
        return Data
    } catch (error) {
        console.log(error)
    }
}

async function addIncentive(data) {
    try {
        let IncentiveModel = new Incentive(data)
        let DeptData = await IncentiveModel.save(data)
        console.log(DeptData)
        return DeptData
    } catch (error) {
        console.log(error)
    }
}

async function updateIncentive(deptId, incentive) {
    try {
        let response = await Incentive.updateOne({ _id: deptId }, incentive )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteIncentive(deptId) {
    try {
        let res = await Incentive.remove({ _id: deptId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getIncentiveData,
    addIncentive,
    updateIncentive,
    deleteIncentive
}