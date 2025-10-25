const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const Product = require("./models/Product");

const app = express();
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/products", productRoutes);

// Seed initial sample data if DB is empty
app.get("/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) return res.send("Already seeded");

  await Product.insertMany([
    {
      name: "Winter Jacket",
      price: 200,
      category: "Apparel",
      variants: [
        { color: "Black", size: "S", stock: 8 },
        { color: "Gray", size: "M", stock: 12 },
      ],
    },
    {
      name: "Smartphone",
      price: 699,
      category: "Electronics",
      variants: [],
    },
    {
      name: "Running Shoes",
      price: 120,
      category: "Footwear",
      variants: [
        { color: "Red", size: "M", stock: 10 },
        { color: "Blue", size: "L", stock: 5 },
      ],
    },
  ]);

  res.send("Database seeded successfully!");
});

// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
