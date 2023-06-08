const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    fullName:String,
    password:String,
    Email:String,
    image:String
})

mongoose.model("Teachers",schema);