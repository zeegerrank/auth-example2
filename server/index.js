require("dotenv").config();
const express = require("express");
const app = express();

/**open server function */
const runServer = () => {
  PORT = 3500 || process.env.PORT;
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
};

/**connect DB then server listens */
const dbConn = require("./db/dbConn");
dbConn(runServer);

app.post("/", (req, res) => {
  return res.send("Hello world");
});
