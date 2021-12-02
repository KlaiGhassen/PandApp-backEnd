var express = require("express");
const Club = require("../models/clubs");
var router = express.Router();

router.get("/", async(req, res, next) => {
    try {
        const clubs = await Club.find();
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:clubName", getClub, (req, res) => {
    res.json(res.club);
});

router.post("/", async(req, res, next) => {
    const club = new Club({
        clubName: req.body.clubName,
        clubOwner: req.body.clubOwner,
        clubLogo: req.body.clubLogo,
        verified: req.body.verified,
        password: req.body.password,
        login: req.body.login,
        description: req.body.description,
        social: req.body.social
    });

    try {
        const newClub = await club.save();

        res.status(201).json({ newClub });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", getClub, async(req, res) => {
    try {
        await res.club.remove();
        res.json({ message: "deleted club" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", getClub, (req, res) => {
    if (req.body.clubName != null) {
        res.club.clubName = req.body.clubName;
    }
    if (req.body.clubOwner != null) {
        res.club.clubOwner = req.body.clubOwner;
    }
    if (req.body.password != null) {
        res.club.password = req.body.password;
    }
    if (req.body.clubLogo != null) {
        res.club.clubLogo = req.body.clubLogo;
    }
    if (req.body.verified != null) {
        res.club.verified = req.body.verified;
    }
    if (req.body.login != null) {
        res.club.login = req.body.login;
    }
    if (req.body.description != null) {
        res.club.description = req.body.description;
    }


    try {
        res.club.save().then((updatedClub) => {
            res.json(updatedClub);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function getClub(req, res, next) {
    try {
        club = await club.find({ clubName: req.params.clubName });
        if (club == null) {
            return res.status(404).json({ message: "cannot find club" });
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.club = club[0];
    next();
}

module.exports = router;