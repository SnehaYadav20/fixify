const express = require("express");
const router = express.Router();
const ctrl = require("../Controllers/booking-controller");
const authM = require("../Middleware/auth-middleware");
const validate = require("../Middleware/validate-middleware");
const { bookingSchema } = require("../Validator/user-validator");

router.post("/", authM, validate(bookingSchema), ctrl.createBooking);
router.get("/mine", authM, ctrl.myBookings);
router.patch("/:id/status", authM, ctrl.updateStatus);

module.exports = router;
