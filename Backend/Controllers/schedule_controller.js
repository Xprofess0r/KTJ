const Schedule = require('../models/schedule.model');

exports.getSchedule = async (req, res) => {
    try {
        let schedule = await Schedule.find().sort({ startingTime: 1 });
        return res.status(200).json({ schedule: schedule });
    } catch (error) {
        console.log("err", error);
        return res.status(400).json("Error", error);
    }
    }
exports.get_specific_Schedule = async (req, res) => {
    try {
        const newdate=req.query?.date;
        if(!newdate)
        return res.status(400).json("Error", error);
        console.log(newdate);
        let schedule = await Schedule.find({date:`${newdate}/01/2024`}).sort({ startingTime: 1 });
        return res.status(200).json({ schedule: schedule });
        // return res.status(200).json({ schedule: "hi" });
    } catch (error) {
        console.log("err", error);
        return res.status(400).json("Error", error);
    }
    }

exports.createSchedule = async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        await newSchedule.save();
        return res.status(200).json({ schedule: newSchedule });
    } catch (error) {
        console.log("err", error);
        return res.status(400).json("Error", error);
    }
    }

exports.updateSchedule = async (req, res) => {
    try {
        const id = req.body._id;
        let schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        await schedule.update(req.body);
        return res.status(200).json({ message: "Schedule updated successfully" });
    } catch (error) {
        console.log("err", error);
        return res.status(400).json("Error", error);
    }
   
}


exports.deleteSchedule = async (req, res) => {
    const id = req.body._id;

    try {
        let schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        await schedule.delete();
        return res.status(200).json({ message: "Schedule Deleted successfully" });
    } catch (error) {
        console.log("err", error);
        res.status(400).json({ error: error });
    }
}
