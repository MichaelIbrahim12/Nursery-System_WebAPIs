const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")
require("./../Models/teacherModel");
const teachersSchema = mongoose.model("Teachers");

exports.login = function (request, response, next) {
  if (request.body.email == "x@x.com" && request.body.password == "123") {
    const token = jwt.sign(
      {
        id: 1,
        role: "admin",
        userName: "x",
      },
      "ITI",
      { expiresIn: "1h" }
    );
    response.status(200).json({ data: "OK", token });
  } else {
    teachersSchema
      .findOne({
        Email: request.body.email,
      })
      .then((user) => {
        if (user == null) {
          
        } else {
          bcrypt.compare(request.body.password, user.password).then((res) => {
            if (res==true) {
              const token = jwt.sign(
                {
                  id: user._id,
                  role: "teacher",
                },
                "ITI",
                { expiresIn: "1h" }
              );

              response.status(200).json({ data: "OK", token });
            }else if(res==false){
                throw new Error("Username or password incorrect..");  
            }
          })
          .catch((error)=>{
            next(error)
          });
        }
      })
      .catch((error)=>{
        next(error)
      })
  }
}
