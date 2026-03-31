const express = require('express')
const router = express.Router()
const ProjectService = require('../controller/project.controller');

router.get("/getProject", (req, res) => {
    ProjectService.getProjectData(req.query).then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveProject", async (req, res) => {
    try {
        let data = await ProjectService.addProject(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateProject/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ProjectService.updateProject(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/addMilestone/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ProjectService.addMilStone(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateMilestone", async (req, res) => {
    try {
        let data = await ProjectService.updateMileStone(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/addTask/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ProjectService.addTask(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateTask", async (req, res) => {
    try {
        let data = await ProjectService.updateTask(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/addIssue/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ProjectService.addIssue(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateIssue", async (req, res) => {
    try {
        let data = await ProjectService.updateIssue(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/addDependency/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await ProjectService.addDependency(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateDependency", async (req, res) => {
    try {
        let data = await ProjectService.updateDependency(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete("/deleteProject/:id", async (req, res) => {
    try {
        const deletedBook = await ProjectService.deleteOne({ _id: req.params.id });
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