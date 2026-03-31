const Attendence = require('../model/attendence.model');


async function getAttendenceRecord(queryParams) {
    
    const page = parseInt(queryParams.page) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;
    try {
        if (queryParams.fname) {
            var TransData = await Attendence.find({ fname: queryParams.fname })
                .sort({ date: -1 }).skip(skip).limit(limit);
            var totalDocument = await Attendence.find({ fname: queryParams.fname })
                .sort({ date: -1 })
        }
        else if (queryParams.organization) {
            var TransData = await Attendence.find({ organization: queryParams.organization })
                .sort({ date: -1 }).skip(skip).limit(limit);
            var totalDocument = await Attendence.find({ organization: queryParams.organization })
                .sort({ date: -1 })
        }
        else if (queryParams.search) {
            var TransData = await Attendence.find({
                $or: [{ organization: new RegExp(queryParams.search) },
                { fname: new RegExp(queryParams.search) }]
            }).sort({ date: -1 }).skip(skip).limit(limit);
            var totalDocument = await Attendence.find({
                $or: [{ organization: new RegExp(queryParams.search) },
                { fname: new RegExp(queryParams.search) }]
            }).sort({ date: -1 })
        }
        else {
            var TransData = await Attendence.find().sort({ date: -1 }).skip(skip).limit(limit);
            var totalDocument = await Attendence.find().sort({ date: -1 })
        }
        let no_of_pages = Math.ceil(totalDocument.length / 25)
        return { data: TransData, totalPages: no_of_pages }
    } catch (error) {
        console.log(error)
    }
}

async function addAttendenceRecord(data) {
    try {
        let AttendenceModel = new Attendence(data)
        let attendenceRecord = await AttendenceModel.save(data)
        return attendenceRecord
    } catch (error) {
        console.log(error)
    }
}

async function updateAttendence(attendenceId, attendence) {
    try {
        let response = await Attendence.updateOne({ _id: attendenceId }, attendence)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteAttendence(attendenceId) {
    try {
        let res = await Attendence.remove({ _id: attendenceId })
        return res
    } catch (error) {
        console.log(error)
    }
}

// const markAbsentEmployees = async () => {
//     try {
//         const currentDate = new Date();
//         const currentHour = currentDate.getHours();
       
//         if (currentHour >= 18) {
//             var employeeAttendence = await Attendence.find({ checkInTime: currentDate.toLocaleDateString() }).sort({ date: -1 })
//             console.log(currentDate.toLocaleDateString())
//             return employeeAttendence
//         }
//     } catch (error) {
//         console.error('Error marking absent employees:', error);
//     }
// };

//   Schedule the markAbsentEmployees function to run every minute
//   setInterval(markAbsentEmployees, 6000);


module.exports = {
    getAttendenceRecord,
    addAttendenceRecord,
    updateAttendence,
    deleteAttendence
    // markAbsentEmployees
}