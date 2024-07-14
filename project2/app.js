const express = require("express");
const app = express();
const userModel = require("./models/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/users", async (req, res) => {
  const users = await userModel.find({});
  res.render("users", { users: users });
});

app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;

  await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/users");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.findOneAndDelete({ _id: id });
  res.redirect("/users");
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.render("edit", { user });
});

app.post("/update", async (req, res) => {
  const { name, email, image } = req.body;
  await userModel.findOneAndUpdate({ email, name, image });
  res.redirect("/users");
});

app.listen(3000, () => {
  console.log("Server is live");
});
