const { AutoIncrementID } = require("@typegoose/auto-increment");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: Number,
  fullName: String,
  age: Number,
  level: { type: String, enum: ["prekg", "kg1", "kg2"] },
  address: {
    city: String,
    street: Number,
    building: Number,
  },
  somefield:Number
});
schema.plugin(AutoIncrementID,{})

const model= mongoose.model("Childrens", schema);

const doc =  model.create({ somefield: 10 });

