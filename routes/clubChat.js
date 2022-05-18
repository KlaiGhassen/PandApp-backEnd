var express = require("express");
const ClubChat = require("../models/clubChat");
var router = express.Router();

router.get("/", async(req, res, next) => {
    try {
        const clubChat = await ClubChat.find();
        res.json(clubChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:clubName", getClubChat, (req, res) => {
    res.json(res.clubChat);
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
    console.log(req)
    const clubChat = new ClubChat({
        clubName: req.body.clubName,
        esmElclub: req.body.esmElclub,
        clubImage: req.body.clubImage
    });

    try {
        const newclubChat = await clubChat.save();

        res.status(201).json( newclubChat );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/*
router.delete("/:id", getEventInt, async(req, res) => {
    try {
        await res.eventInt.remove();
        res.json({ message: "deleted eventInt" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/
/*
router.patch("/:id", getEventInt, (req, res) => {
    if (req.body.userEmail != null) {
        res.eventInt.userEmail = req.body.userEmail;
    }
    if (req.body.postId != null) {
        res.eventInt.postId = req.body.postId;
    }
    try {
        res.eventInt.save().then((updatedEventInt) => {
            res.json(updatedEventInt);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
*/

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