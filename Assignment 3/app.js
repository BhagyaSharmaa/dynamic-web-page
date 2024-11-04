const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
let products = [];

app.get("/catalog", (req, res) => {
  res.render("catalog", { products });
});

app.post("/catalog", upload.single("image"), (req, res) => {
  const { name, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg";

  products.push({ name, description, imagePath });

  res.redirect("/catalog");
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000/catalog");
});
