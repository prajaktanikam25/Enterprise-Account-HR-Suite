const Employee = require('../model/employee.model');
const Salary = require('../model/salary.model');

async function getSalarySlip(queryParams) {
    try {
        if (queryParams.empName) {
            var salData = await Salary.find({ empName: queryParams.empName }).sort({ _id: -1 })
        }
        else {
            var salData = await Salary.find({}).sort({ _id: -1 })
        }
        return salData
    } catch (error) {
        console.log(error)
    }
}

async function addSalarySlip(data) {
    try {
        let SalaryModel = new Salary(data)
        let SalData = await SalaryModel.save(data)
        console.log(SalData)
        return SalData
    } catch (error) {
        console.log(error)
    }
}

async function updateSalarySlip(salId, salary) {
    try {
        let response = await Salary.updateOne({ _id: salId }, salary)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function getEmployeeData() {
    try {
        let empData = await Employee.find({}).sort({ createdAt: -1 })
        console.log(empData)
        return empData
    } catch (error) {
        console.log(error)
    }
}

async function addEmployee(data) {
    try {
        let EmployeeModel = new Employee(data)
        let EmpData = await EmployeeModel.save(data)
        console.log(EmpData)
        return EmpData
    } catch (error) {
        console.log(error)
    }
}

async function updateEmployee(deptId, department) {
    try {
        let response = await Employee.updateOne({ _id: deptId }, department)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteEmployee(deptId) {
    try {
        let res = await Employee.remove({ _id: deptId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getEmployeeData,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getSalarySlip,
    addSalarySlip,
    updateSalarySlip
}