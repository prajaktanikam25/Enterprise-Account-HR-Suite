const TaxModel = require('../model/taxation.model');


async function getTaxation() {
    try {
        let TransData = await TaxModel.find({}).sort({ createdAt: -1 })
        console.log(TransData)
        return TransData
    } catch (error) {
        console.log(error)
    }
}

async function addTaxation(trans) {
    try {
        let Tran = new TaxModel(trans)
        let TransData = await Tran.save(trans)
        console.log(TransData)
        return TransData
    } catch (error) {
        console.log(error)
    }
}

async function updateTaxation(trans_id, transaction) {
    try {
        let response = await TaxModel.updateOne({ _id: trans_id }, transaction)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteTaxation(catId) {
    try {
        let res = await UserModel.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTaxation,
    addTaxation,
    updateTaxation,
    deleteTaxation
}