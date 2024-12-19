const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const connectDB = require("./src/database/connectMongo");
connectDB();
const authRoutes = require('./src/routes/authRoutes')
const bankRoutes = require('./src/routes/bankRoutes')
const inventoryRoutes = require('./src/routes/inventoryRoutes')

const corsMiddleware = require("./src/middleware/corsMiddleware");

app.use(corsMiddleware);

app.use("/api", bankRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", inventoryRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
