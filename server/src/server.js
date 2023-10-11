const express = require("express");
const port = 8080;
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// user library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

// Import router
const authRouter = require("./routes/auth.routes");

// use router
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
