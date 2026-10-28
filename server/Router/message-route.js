const express = require("express");
const router = express.Router();
const ctrl = require("../Controllers/message-controller");
const authM = require("../Middleware/auth-middleware");

router.get("/:bookingId", authM, ctrl.listMessages);
router.post("/:bookingId", authM, ctrl.sendMessage);

module.exports = router;
