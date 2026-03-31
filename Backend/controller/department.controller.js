const Department = require('../model/department.model');

async function getDepartmentData() {
    try {
        let deptData = await Department.find({})
        console.log(deptData)
        return deptData
    } catch (error) {
        console.log(error)
    }
}

async function addDepartment(data) {
    try {
        let DepartmentModel = new Department(data)
        let DeptData = await DepartmentModel.save(data)
        console.log(DeptData)
        return DeptData
    } catch (error) {
        console.log(error)
    }
}

async function updateDepartment(deptId, department) {
    try {
        let response = await Department.updateOne({ _id: deptId }, department )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteDepartment(deptId) {
    try {
        let res = await Department.remove({ _id: deptId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDepartmentData,
    addDepartment,
    updateDepartment,
    deleteDepartment
}