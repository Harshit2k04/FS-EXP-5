require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./models/Student");

const students = [
  { name: "Alice Johnson", age: 20, course: "Computer Science" },
  { name: "Bob Smith", age: 22, course: "Mechanical Engineering" },
  { name: "Charlie Lee", age: 19, course: "Business Administration" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Student.deleteMany({});
    await Student.insertMany(students);
    console.log("Database seeded with sample students.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
