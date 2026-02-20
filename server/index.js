import dotenv from "dotenv";
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";






const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running...")
})

// API routes
app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err)
  })
