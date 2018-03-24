const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Create link to React build directory
app.use(express.static(path.resolve(__dirname, "../build")));

// Handle CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://guarded-plateau-76604.herokuapp.com",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://johannaochville.se"
  ];

  if (allowedOrigins.indexOf(req.headers.origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,application/json, Accept"
  );
  next();
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Lyssnar på port ${PORT}`);
});
