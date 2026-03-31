const ReportModel = require('../model/report.model');


async function getReport() {
    try {
        let ReportData = await ReportModel.find({}).sort({ createdAt: -1 })
        console.log(ReportData)
        return ReportData
    } catch (error) {
        console.log(error)
    }
}

async function addReport(trans) {
    try {
        let Repo = new ReportModel(trans)
        let ReportData = await Repo.save(trans)
        console.log(ReportData)
        return ReportData
    } catch (error) {
        console.log(error)
    }
}

async function updateReport(report_id, report) {
    try {
        let response = await ReportModel.updateOne({ _id: report_id }, report)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteReport(reportId) {
    try {
        let res = await ReportModel.remove({ _id: reportId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getReport,
    addReport,
    updateReport,
    deleteReport
}