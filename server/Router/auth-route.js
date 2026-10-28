const express=require('express');
const router=express.Router();
const authc=require('../Controllers/auth-controller');
const {customerSignupSchema,customerLoginSchema}=require("../Validator/authC-validator");
const {serviceSignupSchema, serviceLoginSchema}=require("../Validator/authS-validator")
const validate=require("../Middleware/validate-middleware")
const authM=require("../Middleware/auth-middleware")

router.route('/').get(authc.home);
router.route('/about').get(authc.about);
router.route('/dashboard').get(authc.dashboard);
router.route('/signinup').get(authc.signinup);
router.route('/loginC').post(validate(customerLoginSchema),authc.loginC);
router.route('/loginS').post(validate(serviceLoginSchema),authc.loginS);
router.route('/registerC').post(validate(customerSignupSchema), authc.registerC);
router.route('/registerS').post(validate(serviceSignupSchema),authc.registerS);

router.route('/message').get(authc.message);
router.route('/messages').get(authc.messages);
router.route("/user").get(authM, authc.user)

module.exports = router;