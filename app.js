require("dotenv").config(); 
require("./config/connection"); 
// require("./config/authStrategy"); 
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const helmet = require("helmet"); 
const cors = require("cors");

//Move routes before the app initialization

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet()); // protect our app from common hacking practices
app.use(morgan("dev")); // generate logs of events in the console
app.use(cors({ credentials: true, origin: true })); //add an object inside the method where it has two parameters, being key value pairs of credentials and origin as keys and the values set to true

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));



//Path Check




//Error handling middleware
app.use((err, req, res, next) => {
  const authErrStatus = err.status || 400;
  const serverErrStatus = err.status || 500;

  if (err.code === 11000) {
    return res.status(authErrStatus).json({
      error: { message: "Already have an account? Try logging in." },
      statusCode: authErrStatus,
    });
  }

  return res.status(serverErrStatus).json({
    error: { message: err.message || "Internal server error." },
    statusCode: serverErrStatus,
  });
});

const comics = require("./data/comicbooks")
app.get("/", (request, response, next) => {
  response.status(200).json({success: {message: "Index route works after deployment"}, data: comics, statusCode: 200}); 
});

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});