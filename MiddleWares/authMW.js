const jwt = require("jsonwebtoken");

module.exports = (request, respsone, next) => {
  try {
    const token = request.get("Authorization").split(" ")[1];

    const decodedToken = jwt.verify(token, "ITI");
    request.decodedToken = decodedToken;
    next();
  } catch (error) {
    next(new Error("not Authenticated"));
  }
};

module.exports.checkTeacher=(request,response,next)=>{
        if (request.decodedToken.role == "teacher") next();
        else next(new Error("Not Authorized"));

}

module.exports.checkadmin = (request, response, next) => {
  if (request.decodedToken.role == "admin") next();
  else next(new Error("Not Authorized"));
};