const express=require("express");
const morgan=require("morgan")
const mongoose=require("mongoose");

//routers import
const teachersRouter=require("./Routers/teacherRouter")
const childrenRouter=require("./Routers/childRouter")
const classRouter=require("./Routers/classRouter")
const loginRouter=require("./Routers/authenticationRouter");
const authenticationMW=require("./MiddleWares/authMW")

//start the server
const server = express();

//connect with db and start server

mongoose.connect("mongodb://127.0.0.1:27017/ITIDB")
    .then(()=>{
      console.log("DB connected...");
      server.listen(process.env.PORT || 8080, () => {
        console.log("server is listening");
      });
    }).catch((error)=>{
      console.log("DB problem " + error);
    })




//middle ware to observe requests
server.use(morgan(":method :url"));

//parse the http body
server.use(express.json());
server.use(express.urlencoded());


// routers
 server.use(loginRouter)

server.use(authenticationMW)

server.use(teachersRouter);
server.use(childrenRouter);
server.use(classRouter)



//Not found middle ware
server.use((request,response)=>{
     response.status(404).json({ message: "Page not Found" }); 
})

//Error handling middle ware
server.use((error,request,response,next)=>{
 response.status(500).json({ message: " exception : " + error });
 
})

