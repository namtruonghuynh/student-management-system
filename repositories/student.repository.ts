import { AppDataSource } from "../config/db.config";
import { Student } from "../entities/student";

export const studentRepository = AppDataSource.getRepository(Student);
