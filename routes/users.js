var express = require("express");
const User = require("../models/user");
var router = express.Router();
const multer = require("multer");
const { POINT_CONVERSION_COMPRESSED } = require("constants");

const picsPath = require("path").resolve(__dirname, "../uploads");

router.get("/download/:nom", function(req, res) {
    let nom = req.params.nom;
    const file = picsPath + "/" + nom;
    console.log(file, "hy");
    res.sendFile(file); // Set disposition and send it.
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        var filetype = "";
        var fileExtension = "";
        if (file.mimetype === "image/gif") {
            filetype = "image-";
            fileExtension = "gif";
        }
        if (file.mimetype === "image/png") {
            filetype = "image-";
            fileExtension = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "image-";
            fileExtension = "jpeg";
        }

        cb(null, filetype + Date.now() + "." + fileExtension);
        h = cb;
    },
});
var upload = multer({
    storage: storage,
});

router.post("/file", upload.single("file"), function(req, res, next) {
    if (!req.file) {
        res.status(500);
        return next(err);
    }
    res.json({
        img: req.file.filename,
    });
});

/* GET users listing. */
router.get("/", async(req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:email", getUser, (req, res) => {
    res.json(res.user);
});
//Post users
router.post("/", async(req, res, next) => {
    const user = new User({
        identifant: req.body.identifant,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        verified: req.body.verified,
        className: req.body.className,
        social: req.body.social,
        role: req.body.role,
        description: req.body.description
    });
    try {
        const newUser = await user.save();

        res.status(201).json({ newUser });
    } catch (err) {
        console.log(err.code);
        if (err.code === 11000) {
            res.json({ isemail: true });
        }
    }
});

router.delete("/:id", getUser, async(req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "deleted user" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:email", getUser, (req, res) => {

    if (req.body.identifant != null) {
        res.user.identifant = req.body.identifant;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.phoneNumber != null) {
        res.user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.profilePicture != null) {
        res.user.profilePicture = req.body.profilePicture;
    }
    if (req.body.FirstName != null) {
        res.user.FirstName = req.body.FirstName;
    }
    if (req.body.LastName != null) {
        res.user.LastName = req.body.LastName;
    }
    if (req.body.verified != null) {
        res.user.verified = req.body.verified;
    }
    if (req.body.social != null) {
        res.user.social = req.body.social;
    }
    if (req.body.role != null) {
        res.user.role = req.body.role;
    }
    if (req.body.description != null) {
        res.user.description = req.body.description;
    }
    if (req.body.className != null) {
        res.user.className = req.body.className;
    }

    try {
        res.user.save().then((updateduser) => {
            res.json(updateduser);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function getUser(req, res, next) {
    try {
        user = await User.find({ email: req.params.email });
        if (user == null) {
            return res.status(404).json({ message: "cannot find user" });
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user[0];
    next();
}

module.exports = router;