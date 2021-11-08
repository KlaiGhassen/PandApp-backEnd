var express = require("express");
const User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post users
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

router.post("/", async (req, res, next) => {
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
    parkId: req.body.parkId,
  });
  console.log('hello2',user);

  try {
    const newUser = await user.save();

      res.status(201).json({ newUser });


  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getUser,  (req, res) => {
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
  if (req.body.parkId != null) {
    res.user.parkId = req.body.parkId;
  }
  try {
    res.user.save().then((updateduser) => {
      res.json(updateduser )

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
