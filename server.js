const express = require("express");
const path = require("path");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/storefront", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/storefront.html"));
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/table.html"));
});

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/list.html"));
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.use(express.urlencoded({ extended: true }));

app.listen(HTTP_PORT, () => {
  console.log("server listening on port: " + HTTP_PORT);
});
