import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cors from "cors";

dotenv.config();
const app = express();

// ✅ CORS Configuration
const allowedOrigins = ['https://merncafe-frontend.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.gjtu4i0.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3080, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
