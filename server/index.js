require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

/**open server function */
const runServer = () => {
  PORT = 3500 || process.env.PORT;
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
};

/**init roles to bd */
const Roles = require("./models/Role");
const initRoles = async () => {
  const roles = ["user", "admin"];
  for (i = 0; i < roles.length; i++) {
    /**check if role exits */
    let role = await Roles.findOne({ name: roles[i] });
    if (!role) {
      Roles.create({ name: roles[i] });
      console.log(roles[i], "added++");
    } else {
      console.log(roles[i], "exits!");
    }
  }
  console.log("Roles initiated");
  return console.log("done");
};

/**connect DB => server listens => init roles */
const dbConn = require("./db/dbConn");
dbConn(runServer, initRoles);

app.post("/", (req, res) => {
  return res.send("Hello world");
});
