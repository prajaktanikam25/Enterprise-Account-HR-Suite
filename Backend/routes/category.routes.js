const express = require('express')
const router = express.Router()
const CategoryService = require('../controller/category.controller');

router.get("/getCategory", (req, res) => {
    CategoryService.getCategoryMaster().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveCategory", async (req, res) => {
    try {
        let data = await CategoryService.addCategoryMaster(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateCategory/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await CategoryService.updateCategory(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})



router.delete("/deleteCategory/:id", async (req, res) => {
    try {
        const deletedBook = await CategoryService.deleteOne({ _id: req.params.id });
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router