const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  _id: Number,
  name: String,
  supervisor: { type: String, ref: "Teachers" },
  children: { type:Array, ref: "Childrens" },
});

mongoose.model("Classes", schema);
