var express = require("express");
const Syrveys = require("../models/Syrveys");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const syrveys = await Syrveys.find();
    res.json(syrveys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getSyrveys , (req, res) => {
  res.json(res.syrveys);
});

router.post("/", async (req, res, next) => {
  const syrveys = new Syrveys({
    publisheId:req.body.publisheId,
    titre: req.body.titre,
    surveyLink: req.body.surveyLink,
    state: req.body.state,
  });

  try {
    const newSyrveys = await syrveys.save();

    res.status(201).json({ newSyrveys });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getSyrveys, async (req, res) => {
  try {
    await res.syrveys.remove();
    res.json({ message: "deleted Syrveys" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getSyrveys, (req, res) => {
  if (req.body.titre != null) {
    res.syrveys.titre = req.body.titre;
  }
  if (req.body.surveyLink != null) {
    res.syrveys.surveyLink = req.body.surveyLink;
  }
  if (req.body.state != null) {
    res.syrveys.state = req.body.state;
  }
  try {
    res.syrveys.save().then((updatedsyrveys) => {
      res.json(updatedsyrveys);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getSyrveys(req, res, next) {
  try {
    syrveys = await Syrveys.findById(req.params.id);
    if (syrveys == null) {
      return res.status(404).json({ message: "cannot find syrveys" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.syrveys = syrveys;
  next();
}

module.exports = router;
