const db = require("mongoose");const DB_URI = process.env.DB_URI;

const dbConn = async (...func) => {
  db.connect(DB_URI);

  db.connection.once("open", () => {
    console.log("Database is connected");
    func[0]();
    func[1]();
  });
  db.connection.on("error", (err) => {
    return err;
  });
};

module.exports = dbConn;
