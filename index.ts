import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db.config";
import studentRoutes from "./routes/student.route";

dotenv.config();
const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
