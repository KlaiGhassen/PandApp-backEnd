var express = require("express");
const Messageclub = require("../models/Messageclub");
const ClubChat = require("../models/clubChat");
var router = express.Router();


router.get("/", async(req, res, next) => {
    try {
        const messageclub = await Messageclub.find();
        res.json(messageclub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/*
router.get("/eventIntById/:postId", async(req, res, next) => {
    try {
        const events = await EventInt.find({ postId: req.params.postId });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/eventByUser/:userEmail", async(req, res, next) => {
    try {
        const events = await EventInt.find({ userEmail: req.params.userEmail });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/

router.post("/", async(req, res, next) => {
    //console.log(req)
    //console.log(req.body)
    const messageclub = new Messageclub({
        textMessage: req.body.textMessage,
        userId: req.body.userId,
        time: Date.now(),
        clubChat: req.body.clubChat,
        userImage:req.body.userImage
    });

    try {
        const newMessageclub = await messageclub.save();
        const clubChat = await ClubChat.findById(req.body.clubChat)
        clubChat.messageclubs.push(newMessageclub)
        clubChat.save();
        


        res.status(201).json( newMessageclub );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



async function getClubChat(req, res, next) {
    try {
        clubChat = await ClubChat.find({clubName: req.params.clubName}).populate("messageclubs");
        if (clubChat == null) {
            return res.status(404).json({ message: "cannot find clubChat" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.clubChat = clubChat[0];
    next();
}

module.exports = router;