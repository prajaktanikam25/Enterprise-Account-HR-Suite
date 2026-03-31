const Budget = require('../model/budget.model');

async function getBudgetData() {
    try {
        let budgetData = await Budget.find({})
        console.log(budgetData)
        return budgetData
    } catch (error) {
        console.log(error)
    }
}

async function addBudgetData(data) {
    try {
        let BudgetModel = new Budget(data)
        let BudgetData = await BudgetModel.save(data)
        console.log(BudgetData)
        return BudgetData
    } catch (error) {
        console.log(error)
    }
}

async function updateBudget(budgetId, budget) {
    try {
        let response = await Budget.updateOne({ _id: budgetId }, budget )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteBudget(budgetId) {
    try {
        let res = await Budget.remove({ _id: budgetId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBudgetData,
    addBudgetData,
    updateBudget,
    deleteBudget
}