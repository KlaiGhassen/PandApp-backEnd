const express = require("express");
const router = express.Router();
const userdb = require("../models/message");
var nodemailer = require("nodemailer");

//getting all

/**
 * @swagger
 * tags:
 *  name: message
 *  description: This is for the main message
 * /message:
 *  get:
 *    tags: [message]
 *    description: Use to request all message
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/", (req, res) => {
  try {
    userdb
      .find()
      .sort("created_at")
      .then((messages) => {
        res.json(messages);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * tags:
 *  name: message
 *  description: This is for the main message
 * /message:
 *  post:
 *   tags: [message]
 *   summary: Creates a new message.
 *   requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             whoSend:
 *              type: string
 *             content:
 *              type: string
 *             toSend:
 *              type: string
 *  responses:
 *      201:
 *         description: Created
 */

router.post("/", async (req, res) => {
  const compte = new userdb({
    userName: req.body.userName,
    messageContent: req.body.messageContent,
    roomName: req.body.roomName,
    viewType: req.body.viewType,
  });
  try {
    const newUser = await compte.save();
    if (newUser) {
      res.status(201).json({ message: newUser });
    }
  } catch (err) {
    console.log(err.code);
    res.json(err);
  }
});
//envoyer

/**
 * @swagger
 * tags:
 *  name: message
 *  description: This is for the main message
 * /message/tosend/{id}:
 *  get:
 *   tags: [message]
 *   summary: this Api used to get one message from database
 *   description: this api is used to get one message from database
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Must provide  Id
 *       schema:
 *        type: string
 *   responses:
 *     '200':
 *        description: A successful response
 */

router.get("/tosend/:toSend", async (req, res, next) => {
  try {
    const msg = await userdb.find({ toSend: req.params.toSend });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//recu

/**
 * @swagger
 * tags:
 *  name: message
 *  description: This is for the main message
 * /message/whosend/{id}:
 *  get:
 *   tags: [message]
 *   summary: this Api used to get one message from database
 *   description: this api is used to get one message from database
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Must provide  Id
 *       schema:
 *        type: string
 *   responses:
 *     '200':
 *        description: A successful response
 */
router.get("/:roomName", (req, res) => {
  let roomName = req.params.roomName;
  userdb.find({ roomName: roomName }).then((messages) => {
    res.status(201).json(messages);
  });
});

module.exports = router;
