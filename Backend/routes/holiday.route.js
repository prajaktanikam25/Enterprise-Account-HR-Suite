const express = require('express')
const router = express.Router()
const HolidayService = require('../controller/holiday.controller');

router.get("/getHoliday", (req, res) => {
    HolidayService.getHolidayData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.get("/getAllHoliday", (req, res) => {
    HolidayService.getAllHolidayData().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(400).json(error)
    })
})

router.post("/saveHoliday", async (req, res) => {
    try {
        let data = await HolidayService.addHoliday(req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.put("/updateHoliday/:id", async (req, res) => {
    try {
        console.log(req.params)
        let data = await HolidayService.updateHoliday(req.params.id, req.body)
        res.status(201).json(data)
    }
    catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

router.delete("/deleteHoliday/:id", async (req, res) => {
    try {
        const deletedBook = await HolidayService.deleteOne({ _id: req.params.id });
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