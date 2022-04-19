var express = require("express");
const LostPost = require("../models/lostPost");
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
        if (file.mimetype === "image/jpg") {
            filetype = "image-";
            fileExtension = "jpg";
        }

        cb(null, filetype + Date.now() + "." + fileExtension);
        h = cb;
    },
});
var upload = multer({
    storage: storage,
});
/* GET users listing. */


//get all syveys

/**
 * @swagger
* tags:
*  name: lostpost
*  description: This is for the main lostpost
* /lostpost:
*  get:
*    tags: [lostpost]
*    description: Use to request all lostpost
*    responses:
*      '200':
*        description: A successful response
*/
router.get("/", async(req, res, next) => {
    try {
        const lostPost = await LostPost.find();
        res.json(lostPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/lostFound/:type", async(req, res, next) => {

    console.log("hello",req.params)
    try {
        const lost = await LostPost.find({ type: req.params.type });
        res.json(lost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Post users
router.get("/:id", getLostPost, (req, res) => {
    res.json(res.lostPost);
});
router.post("/addpost", upload.single("file"), async(req, res, next) => {
    console.log("helleo")
    const lostPost = new LostPost({
        publisheId: req.body.publisheId,
        state: req.body.state,
        type: req.body.type,
        objet: req.body.objet,
        place: req.body.place,
        
    });
    if (req.file) {
        req.file.filename = req.file.filename
        lostPost.image = req.file.filename
        console.log(lostPost.image)
        
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",req.file)
    } else{
        cosnole.log("filllllllllllllllle problem")
    }

    try {
        const newLost = await lostPost.save();

        res.status(201).json({ newLost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", getLostPost, async(req, res) => {
    try {
        await res.lostPost.remove();
        res.json({ message: "deleted Post" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", getLostPost, (req, res) => {
    if (req.body.publisheId != null) {
        res.lostPost.publisheId = req.body.publisheId;
    }
    if (req.body.state != null) {
        res.lostPost.state = req.body.state;
    }
    if (req.body.type != null) {
        res.lostPost.type = req.body.type;
    }
    if (req.body.object != null) {
        res.lostPost.object = req.body.object;
    }
    if (req.body.place != null) {
        res.lostPost.place = req.body.place;
    }
    if (req.body.image != null) {
        res.lostPost.image = req.body.image;
    }
    try {
        res.lostPost.save().then((updatedPost) => {
            res.json(updatedPost);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function getLostPost(req, res, next) {
    try {
        lostPost = await LostPost.findById(req.params.id);
        if (lostPost == null) {
            return res.status(404).json({ message: "cannot find Lost" });
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.lostPost = lostPost;
    next();
}

module.exports = router;