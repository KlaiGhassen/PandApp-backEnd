var express = require("express");
const Event = require("../models/eventsPost");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

router.post("/", async (req, res, next) => {
  const event = new Event({
    publisheId: req.body.publisheId,
    publishedAt: req.body.publishedAt,
    state: req.body.state,
    type: req.body.type,
    place: req.body.place,
    banner: req.body.banner,
    Time:req.body.Time,
    price:req.body.price
  });

  try {
    const newEvent = await event.save();

    res.status(201).json({ newEvent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: "deleted event" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getEvent, (req, res) => {
  if (req.body.publisheId != null) {
    res.event.publisheId = req.body.publisheId;
  }
  if (req.body.publishedAt != null) {
    res.event.publishedAt = req.body.publishedAt;
  }
  if (req.body.state != null) {
    res.event.state = req.body.state;
  }
  if (req.body.type != null) {
    res.event.type = req.body.type;
  }
  if (req.body.place != null) {
    res.event.place = req.body.place;
  }
  if (req.body.banner != null) {
    res.event.banner = req.body.banner;
  }
  if (req.body.Time != null) {
    res.event.Time = req.body.Time;
  }
  if (req.body.price != null) {
    res.event.price = req.body.price;
  }

  try {
    res.event.save().then((updatedEvent) => {
      res.json(updatedEvent);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getEvent(req, res, next) {
  try {
    event = await event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "cannot find event" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.event = event;
  next();
}

module.exports = router;
