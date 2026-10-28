const express=require("express")
const router=express.Router();
const adminC= require("../Controllers/admin-controller")
const authM=require("../Middleware/auth-middleware")
const adminM=require("../Middleware/admin-middleware")

router.route("/userC").get(authM,adminM,adminC.getAllUserC)
router.route("/userS").get(authM,adminM,adminC.getAllUserS)
router.route("/userC/:id").get(authM, adminM, adminC.getUserC);
router.route("/userS/:id").get(authM, adminM, adminC.getUserS);
router.route("/userC/update/:id").patch(authM, adminM, adminC.updateUserC);
router.route("/userS/update/:id").patch(authM, adminM, adminC.updateUserS);
router.route("/userC/delete/:id").delete(authM, adminM, adminC.deleteUserC);
router.route("/userS/delete/:id").delete(authM, adminM, adminC.deleteUserS);
router.route("/contacts").get(authM,adminM,adminC.getAllContacts)
router.route("/contacts/delete/:id").delete(authM, adminM, adminC.deleteContact);

module.exports=router

