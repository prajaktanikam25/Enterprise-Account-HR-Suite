const express = require('express')
const router = express.Router()
const OrganizationService = require('../controller/organization.controller');

router.get("/getOrganization", (req, res) => {
    OrganizationService.getOrganization().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveOrganization", async (req, res) => {
    try {
        let data = await OrganizationService.addOrganization(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateOrganization/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await OrganizationService.updateOrganization(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete("/deleteOragnization/:id", async (req, res) => {
    try {
        const deletedBook = await OrganizationService.deleteOne({ _id: req.params.id });
        if (!deletedBook) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router