var express = require("express");
const OtherPost = require("../models/otherPost");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const otherPost = await OtherPost.find();
    res.json(otherPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Post users
router.get("/:id", getOtherPost, (req, res) => {
  res.json(res.otherPost);
});
router.post("/", async (req, res, next) => {
  const otherPost = new OtherPost({
    publisheId: req.body.publisheId,
    state: req.body.state,
    type: req.body.type,
    Image: req.body.Image,
    description: req.body.description,
    place: req.body.place,
    title: req.body.title,
  });

  try {
    const newOtherPost = await otherPost.save();

    res.status(201).json({ newOtherPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getOtherPost, async (req, res) => {
  try {
    await res.otherPost.remove();
    res.json({ message: "deleted Post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getOtherPost, (req, res) => {
  if (req.body.publisheId != null) {
    res.otherPost.publisheId = req.body.publisheId;
  }
  if (req.body.state != null) {
    res.otherPost.state = req.body.state;
  }
  if (req.body.type != null) {
    res.otherPost.type = req.body.type;
  }
  if (req.body.description != null) {
    res.otherPost.description = req.body.description;
  }
  if (req.body.place != null) {
    res.otherPost.place = req.body.place;
  }
  if (req.body.Image != null) {
    res.otherPost.Image = req.body.Image;
  }
  if (req.body.title != null) {
    res.otherPost.title = req.body.title;
  }
  
  try {
    res.otherPost.save().then((updatedPost) => {
      res.json(updatedPost);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getOtherPost(req, res, next) {
  try {
    otherPost = await OtherPost.findById(req.params.id);
    if (otherPost == null) {
      return res.status(404).json({ message: "cannot find Post" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.otherPost = otherPost;
  next();
}

module.exports = router;
