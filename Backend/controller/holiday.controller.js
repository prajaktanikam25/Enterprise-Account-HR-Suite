const Holiday = require('../model/holiday.model');

async function getHolidayData() {
    try {
        let HolidayData = await Holiday.find({}).sort({ _id: -1 }).limit(1);
        return HolidayData
    } catch (error) {
        console.log(error)
    }
}

async function getAllHolidayData() {
    try {
        let HolidayData = await Holiday.find({}).sort({ _id: -1 })
        return HolidayData
    } catch (error) {
        console.log(error)
    }
}

async function addHoliday(data) {
    try {
        let HolidayModel = new Holiday(data)
        let HolidayData = await HolidayModel.save(data)
        return HolidayData
    } catch (error) {
        console.log(error)
    }
}

async function updateHoliday(id, expense) {
    try {
        let response = await Holiday.updateOne({ _id: id }, expense)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteHoliday(HolidayId) {
    try {
        let res = await Holiday.remove({ _id: HolidayId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getHolidayData,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    getAllHolidayData
}