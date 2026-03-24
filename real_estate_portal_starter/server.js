
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/realestate");

const Property = mongoose.model("Property", {
  title: String,
  price: Number,
  location: String,
  image: String,
  description: String
});

const storage = multer.diskStorage({
  destination: (req,file,cb)=>cb(null,"uploads"),
  filename:(req,file,cb)=>cb(null,Date.now()+path.extname(file.originalname))
});

const upload = multer({storage});

app.get("/api/properties", async(req,res)=>{
  const data = await Property.find();
  res.json(data);
});

app.post("/api/properties", upload.single("image"), async(req,res)=>{
  const property = new Property({
    title:req.body.title,
    price:req.body.price,
    location:req.body.location,
    description:req.body.description,
    image:req.file.filename
  });

  await property.save();
  res.json({message:"Property added"});
});

app.listen(3000, ()=>{
  console.log("Server running on http://localhost:3000");
});
