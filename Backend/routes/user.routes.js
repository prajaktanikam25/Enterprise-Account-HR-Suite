const express = require('express')
const router = express.Router()
const UserService = require('../controller/user.controller');
const User = require('../model/userMaster.model');

router.get("/getUser", (req, res) => {
    UserService.getUser().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.put("/updateUser/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await UserService.updateUser(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete('/deleteUser/:id', async (req, res) => {
    const studentId = req.params.id;

    // 4. Implement the delete functionality
    try {
        // Use Mongoose to delete the student document
        const result = await User.deleteOne({ _id: studentId });

        if (!result) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router