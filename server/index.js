const express = require("express");
const app = express();

PORT = 3500 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

app.post("/", (req, res) => {
  return res.send("Hello world");
});
