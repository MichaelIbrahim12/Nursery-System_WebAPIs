const express = require("express");
const controller=require("./../Controllers/childController")
const router = express.Router();
const { checkTeacher, checkadmin } = require("./../MiddleWares/authMW");

router.route("/child")
  .get(checkTeacher,controller.getAllChildren)

  .post(checkadmin,controller.addChild)
  .put(checkadmin,controller.updateChild)
  .delete(checkadmin,controller.deleteChild);

router.route("/child/:id")
    .get(checkTeacher,controller.getChildbyId)

  module.exports=router;