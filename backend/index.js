import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));



  
//   Routes
// import contactroute from "./routes/contact.js";
import userRoute from "./routes/userRoute.js";

// app.use('/api/auth', authRoutes);
// app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoute);





// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
