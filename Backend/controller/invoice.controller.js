const InvoiceModel = require('../model/invoice.model');

async function getInvoice() {
    try {
        let InvoData = await InvoiceModel.find({})
        console.log(InvoData)
        return InvoData
    } catch (error) {
        console.log(error)
    }
}

async function addInvoice(trans) {
    try {
        let Tran = new InvoiceModel(trans)
        let InvoData = await Tran.save(trans)
        console.log(InvoData)
        return InvoData
    } catch (error) {
        console.log(error)
    }
}

async function updateInvoice(invoice_id, invoice) {
    try {
        let response = await InvoiceModel.updateOne({ _id: invoice_id }, invoice )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteInvoice(catId) {
    try {
        let res = await InvoiceModel.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getInvoice,
    addInvoice,
    updateInvoice,
    deleteInvoice
}