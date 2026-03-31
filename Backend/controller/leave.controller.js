const Leave = require('../model/leave.model');

async function getLeaveData(empName, organization, search) {
    try {
        if (empName) {
            let LeaveData = await Leave.find({ empName: empName }).sort({ createdAt: -1 })
            return LeaveData
        }
        else if (organization) {
            let LeaveData = await Leave.find({ organization: organization }).sort({ createdAt: -1 })
            return LeaveData
        }
        else if (search) {
            let LeaveData = await Leave.find({ $or: [{ organization: new RegExp(search) }, { empName: new RegExp(search) }] }).sort({ createdAt: -1 })
            return LeaveData
        }
        else {
            let LeaveData = await Leave.find().sort({ createdAt: -1 })
            return LeaveData
        }
    } catch (error) {
        console.log(error)
    }
}

async function addLeave(data) {
    try {
        let LeaveModel = new Leave(data)
        let LeaveData = await LeaveModel.save(data)
        // console.log(LeaveData)
        return LeaveData
    } catch (error) {
        console.log(error)
    }
}

async function updateLeave(leaveId, leave) {
    try {
        let response = await Leave.updateOne({ _id: leaveId }, leave)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteLeave(leaveId) {
    try {
        let res = await Leave.remove({ _id: leaveId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLeaveData,
    addLeave,
    updateLeave,
    deleteLeave
}