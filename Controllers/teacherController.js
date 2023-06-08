const mongoose=require("mongoose");
const bcrypt =require("bcrypt");

require("./../Models/teacherModel")

const techerSchema = mongoose.model("Teachers"); //schema




exports.getAllTeachers=function(request,response,next){

  techerSchema.find({})
              .then((data)=>{
                  response.status(200).json(data);
              })
              .catch((error)=>{
                  next(error)
              })

}

exports.addTeacher=function(request,response,next){
  
  bcrypt
    .hash(request.body.password, 10)
    .then((hash)=>{
          let teacher = new techerSchema({
            fullName: request.body.fullName,
            password: hash,
            Email: request.body.Email,
            image: request.body.image,
          });

          teacher
            .save()
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((error) => {
              next(error);
            });
    })


    
}

exports.updateTeacher=function(request,response,next){
   
  bcrypt.hash(request.body.password, 10).then((hash) => {
  techerSchema
      .updateOne(
        { 
          fullName:request.body.fullName },
        {
          $set: {
            password: hash,
            Email: request.body.Email,
            image: request.body.image,
          },
        }
      )
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  });


}

exports.deleteTeacher=function(request,response,next){
        techerSchema.deleteOne({
          fullName: request.body.fullName,
        })
        .then((data)=>{
          response.status(200).json(data);
        })
        .catch((error)=>{
          next(error);
        })
}










// exports.addTeacher = function (request, response, next) {
//   let pass = "";
//   bcrypt.hash(request.body.password, 10).then((hash) => {
//     pass = hash;
//   });

//   let teacher = new techerSchema({
//     fullName: request.body.fullName,
//     password: pass,
//     Email: request.body.Email,
//     image: request.body.image,
//   });

//   teacher
//     .save()
//     .then((data) => {
//       response.status(200).json(data);
//     })
//     .catch((error) => {
//       next(error);
//     });
// };