import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();


// Middlewares

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

// Database connection

const URI = "mongodb://localhost:27017/blog";

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  const { connection } = await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Database is connect with ${connection.host}`);
};

connectDB();

// Server listening

const PORT = 4000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

// Routes

import postRoute from "./routes/Post.js";

app.use("/api/v1", postRoute);
