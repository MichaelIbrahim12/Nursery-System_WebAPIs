const mongoose = require("mongoose");
require("./../Models/childModel");
const childSchema = mongoose.model("Childrens");


exports.getAllChildren = function (request, response, next) {
  childSchema
    .find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
//  response.status(200).json({ data: "child with id :" + request.params.id });

exports.getChildbyId = function (request, response, next) {
  childSchema
    .find({ _id: request.params.id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.addChild = function (request, response, next) {
  let child = new childSchema({
     _id:request.body.id,
    fullName: request.body.fullName,
    age: request.body.age,
    level: request.body.level,
    address: {
      city: request.body.address.city,
      street: request.body.address.street,
      building: request.body.address.building,
    },
  });

  child
    .save()
    .then((data) => {
      response.status(200).json(data);
    }).catch(error => {
      next(error);
    });
};
exports.updateChild = function (request, response, next) {
  childSchema
    .updateOne(
      { _id: request.body.id },
      {
        $set: {
          fullName: request.body.fullName,
          age: request.body.age,
          level: request.body.level,
          address: {
            city: request.body.address.city,
            street: request.body.address.street,
            building: request.body.address.building,
          },
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
exports.deleteChild = function (request, response, next) {
  childSchema
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
