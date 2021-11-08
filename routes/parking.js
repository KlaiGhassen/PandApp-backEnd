var express = require("express");
const Parking = require("../models/parking");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getParking, (req, res) => {
  res.json(res.parking);
});

router.post("/", async (req, res, next) => {
  const parking = new Parking({
    longatitude: req.body.longatitude,
    latatitude: req.body.latatitude,
    creted_at: req.body.creted_at,
    userId: req.body.userId,
  });

  try {
    const newParking = await parking.save();

    res.status(201).json({ newParking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getParking, async (req, res) => {
  try {
    await res.parking.remove();
    res.json({ message: "deleted parking" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getParking, (req, res) => {
  if (req.body.longatitude != null) {
    res.parking.longatitude = req.body.longatitude;
  }
  if (req.body.latatitude != null) {
    res.parking.latatitude = req.body.latatitude;
  }
  if (req.body.creted_at != null) {
    res.parking.creted_at = req.body.creted_at;
  }
  if (req.body.userId != null) {
    res.parking.userId = req.body.userId;
  }

  try {
    res.parking.save().then((updatedParking) => {
      res.json(updatedParking);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getParking(req, res, next) {
  try {
    parking = await parking.findById(req.params.id);
    if (parking == null) {
      return res.status(404).json({ message: "cannot find parking" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.parking = parking;
  next();
}

module.exports = router;
