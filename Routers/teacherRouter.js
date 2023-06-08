const express=require("express");
const controller=require("./../Controllers/teacherController")

const router=express.Router();

router.route("/teachers")
.get(controller.getAllTeachers)
.post(controller.addTeacher)
.put(controller.updateTeacher)
.delete(controller.deleteTeacher)


module.exports=router;