const express = require("express");

const proxy = require("express-http-proxy");
const cors = require("cors");

const { ErrorHandler } = require("./utils/error-handler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:8001"));
app.use("/shopping", proxy("http://localhost:8002"));
app.use("/", proxy("http://localhost:8003"));

app.get("/", (req, res) => {
  res.json({ message: "alsfdlak" });
});

app.use(ErrorHandler);

app.listen(8000, () => {
  console.log("listening to port 8000");
});
