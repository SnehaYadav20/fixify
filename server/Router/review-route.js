const express = require("express");
const router = express.Router();
const ctrl = require("../Controllers/review-controller");
const authM = require("../Middleware/auth-middleware");
const validate = require("../Middleware/validate-middleware");
const { reviewSchema } = require("../Validator/user-validator");

router.post("/", authM, validate(reviewSchema), ctrl.createReview);
router.get("/provider/:id", ctrl.providerReviews);

module.exports = router;
