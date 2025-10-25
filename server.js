const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Use product routes
app.use("/", productRoutes);

// Test route to make sure server works
app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/productsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
