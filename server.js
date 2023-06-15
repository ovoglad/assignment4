const express = require("express");
const path = require("path");
const data = require("./modules/officeData.js");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/contactus", (req, res) => {
  res.sendFile(__dirname + "/views/form.html");
});

app.post("/contactus", (req, res) => {
  const formData = req.body;

  console.log(formData);

  res.send("Thank you for contacting us!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/storefront", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/storefront.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/cart.html"));
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/table.html"));
});

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/list.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/form.html"));
});

app.get("/employee/:employeeNum", (req, res) => {
  data
    .getEmployeeByNum(req.params.employeeNum)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.get("/PartTimer", (req, res) => {
  data.getPartTimers().then((data) => {
    res.json(data);
  });
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

data
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch(function (err) {
    console.log("unable to start server: " + err);
  });
