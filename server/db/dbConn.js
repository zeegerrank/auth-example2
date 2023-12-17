const db = require("mongoose");const DB_URI = process.env.DB_URI;

const dbConn = async (cb) => {
  db.connect(DB_URI);

  db.connection.once("open", () => {
    console.log("Database is connected");
    cb();
  });
  db.connection.on("error", (err) => {
    return err;
  });
};

module.exports = dbConn;
