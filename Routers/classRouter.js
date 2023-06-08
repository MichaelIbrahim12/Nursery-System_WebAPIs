const express = require("express");

const controller = require("./../Controllers/classController");

const router = express.Router();

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(controller.addClass)
  .put(controller.updateClass)
  .delete(controller.deleteClass);

router.route("/class/:id").get(controller.getClassdbyId);

router.route("/classchildren/:id").get(controller.getClassChildren);

router.route("/classteacher/:id").get(controller.getClassSupervisor);

module.exports = router;
