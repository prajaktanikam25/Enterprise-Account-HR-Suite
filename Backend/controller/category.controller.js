const Category = require('../model/category.model');

async function getCategoryMaster() {
    try {
        let CatData = await Category.find({})
        console.log(CatData)
        return CatData
    } catch (error) {
        console.log(error)
    }
}

async function addCategoryMaster(data) {
    try {
        let CategoryModel = new Category(data)
        let CategoryData = await CategoryModel.save(data)
        console.log(CategoryData)
        return CategoryData
    } catch (error) {
        console.log(error)
    }
}

async function updateCategory(CatId, category) {
    try {
        let response = await Category.updateOne({ _id: CatId }, category )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteCategory(catId) {
    try {
        let res = await Category.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCategoryMaster,
    addCategoryMaster,
    updateCategory,
    deleteCategory
}