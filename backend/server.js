const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://prod_db_access:Dev109accessdb@cluster0.vzzcj.mongodb.net/expenz?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);

// Start the server
const PORT = process.env.PORT || 5001; // Change to a different port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
