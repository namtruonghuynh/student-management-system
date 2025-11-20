import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db.config";
import studentRoutes from "./routes/student.route";
import authRoutes from "./routes/auth.route";
import cors from "cors";

dotenv.config();
const app = express();

// Cấu hình CORS để cho phép các yêu cầu từ frontend
app.use(cors());

// Đặt middleware phân tích JSON
app.use(express.json());

// Đăng ký routes trước, không cần đợi DB
app.use("/auth", authRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 7000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
  });
