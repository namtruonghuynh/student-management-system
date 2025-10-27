import { Request, Response } from "express";
import { StudentService } from "../services/student.service";

const service = new StudentService();

export class StudentController {
  async getAll(req: Request, res: Response) {
    const students = await service.getAll();
    res.json(students);
  }

  async getById(req: Request, res: Response) {
    const student = await service.getById(Number(req.params.id));
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  }

  async create(req: Request, res: Response) {
    const student = await service.create(req.body);
    res.status(201).json(student);
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const success = await service.delete(Number(req.params.id));
    if (!success) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  }
}
