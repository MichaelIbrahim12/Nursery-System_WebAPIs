const mongoose=require("mongoose");

require("./../Models/classModel")
const classSchema = mongoose.model("Classes");
const teacherSchema=mongoose.model("Teachers")



exports.getAllClasses = function (request, response) {
     
    classSchema
      .find({})
      .populate({ path: "supervisor", select: { fullName: 1 } })
      .populate({ path: "children", select: { fullName: 1 } })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
};
exports.getClassdbyId = function (request, response,next) {
 
    classSchema
      .find({ _id: request.params.id })
      .populate({ path: "supervisor", select: { fullName: 1 } })
      .populate({ path: "children", select: { fullName: 1 } })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
};

exports.addClass = function (request, response, next) {
  let supervisor = teacherSchema
    .findOne({ _id: request.body.supervisor })
    .then((supervisor) => {
      if (supervisor == null) {
        throw new Error("supervisor not exist");
      } else {
        let obj = new classSchema({
          _id: request.body.id,
          name: request.body.name,
          supervisor: request.body.supervisor,
          children: request.body.children,
        });
        return obj.save();
      }
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
  
} 

exports.updateClass = function (request, response,next) {
          classSchema
            .updateOne(
              { _id: request.body.id },
              {
                $set: {
                  name: request.body.name,
                  supervisor: request.body.supervisor,
                  children: request.body.children,
                },
              }
            )
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((error) => {
              next(error);
            });
};

exports.deleteClass = function (request, response,next) {
          classSchema
            .deleteOne({
              _id: request.body.id,
            })
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((error) => {
              next(error);
            });
};

exports.getClassChildren = function (request, response,next) {
    classSchema
      .findOne({ _id: request.params.id },{children:1})
      .populate({ path: "children", select: { fullName: 1 } })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
};

exports.getClassSupervisor = function (request, response,next) {
    classSchema
      .findOne({ _id: request.params.id },{supervisor:1})
      .populate({ path: "supervisor", select: { fullName: 1 } })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
};
