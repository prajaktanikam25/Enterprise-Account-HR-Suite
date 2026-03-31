const Attendence = require('../model/attendence.model');
const Salary = require('../model/salary.model');
const moment = require('moment');

function TotalAttendenceCount(name) {
    var date = new Date();
    var startDate = moment(date).startOf('month');
    var endDate = moment(date).endOf('month');

    let matchCondition = { $match: { organization: name } }
    let matchCondition1 = { $match: { isApproved: "Verified", date: { $gte: new Date(startDate), $lte: new Date(endDate) } } }
    let groupCondition = {
        $group: {
            "_id": { "fname": "$fname", "lname": "$lname", "organization": "$organization" },
            // "_id": "$fname",
            "present": {
                "$sum": {
                    "$cond": [
                        { "$eq": ["$attendence", 1] },
                        1,
                        0]
                }
            },
            "absent": {
                "$sum": {
                    "$cond": [
                        { "$eq": ["$attendence", 0] },
                        1,
                        0]
                }
            },
            "half_day": {
                "$sum": {
                    "$cond": [
                        { "$eq": ["$attendence", 2] },
                        1,
                        0]
                }
            },
            "latemark": {
                "$sum": {
                    "$cond": [
                        { "$eq": ["$attendence", 3] },
                        1,
                        0]
                }
            }
            // "leave": {
            //     "$sum": {
            //         "$cond": [
            //             { "$eq": ["$attendence", 3] },
            //             1,
            //             0]
            //     }
            // },
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
            "fname": "$_id.fname",
            "lname": "$_id.lname",
            "organization": "$_id.organization",
            "present": "$present",
            "absent": "$absent",
            "latemark": "$latemark",
            "half_day": "$half_day",
        }
    }
    let pipeline = name ? [matchCondition, matchCondition1, groupCondition, sortCondition, projectCondition] : [matchCondition1, groupCondition, sortCondition, projectCondition]
    let total = Attendence.aggregate(pipeline)
    return total
}


function TotalSalaryCount(name) {
    var date = new Date();
    var startDate = moment(date).startOf('month');
    var endDate = moment(date).endOf('month');

    // let matchCondition = { $match: { organization: name, date: { $gte: new Date('2023-07-01'), $lte: new Date('2023-07-31') } } }
    let matchCondition = { $match: { organization: name, date: { $gte: new Date(startDate), $lte: new Date(endDate) } } }

    let groupCondition = {
        $group: {
            "_id": { "fname": "$fname", "lname": "$lname", "organization": "$organization" },
            "totalIncome": { $sum: "$net_amount" }
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
            "fname": "$_id.fname",
            "lname": "$_id.lname",
            "organization": "$_id.organization",
            "totalIncome": "$totalIncome"
        }
    }
    let pipeline = name ? [matchCondition, groupCondition, sortCondition, projectCondition] : [groupCondition, sortCondition, projectCondition]
    let total = Salary.aggregate(pipeline)
    return total
}
module.exports = {
    TotalAttendenceCount,
    TotalSalaryCount
}