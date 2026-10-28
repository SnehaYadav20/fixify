const express = require("express");
const router = express.Router();
const ctrl = require("../Controllers/user-controller");
const validate = require("../Middleware/validate-middleware");
const { loginSchema, registerSchema } = require("../Validator/user-validator");
const authM = require("../Middleware/auth-middleware");

router.post("/register", validate(registerSchema), ctrl.register);
router.post("/login", validate(loginSchema), ctrl.login);
router.get("/me", authM, ctrl.me);

module.exports = router;
