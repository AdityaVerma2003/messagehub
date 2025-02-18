require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Connection to MongoDB failed",error);
        process.exit(1);
    }
};
connectDB();
// Define Mongoose Schema
const formSchema = new mongoose.Schema({
  username: String,
  email: String,
  message: String,
}, { timestamps: true });

const Form = mongoose.model("Form", formSchema);

// API Route to handle form submission
app.post("/submit", async (req, res) => {
  try {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newForm = new Form({ username, email, message });
    await newForm.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/messages", async (req, res) => {
    try {
      const messages = await Form.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
