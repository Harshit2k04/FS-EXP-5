require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Student Management API"));

app.use("/students", studentRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
