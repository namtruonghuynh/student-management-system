import { studentRepository } from "../repositories/student.repository";
import { Student } from "../entities/student";

export class StudentService {
  async getAll(): Promise<Student[]> {
    return studentRepository.find();
  }

  async getById(id: number): Promise<Student | null> {
    return studentRepository.findOneBy({ id });
  }

  async create(studentData: Partial<Student>): Promise<Student> {
    const newStudent = studentRepository.create(studentData);
    return studentRepository.save(newStudent);
  }

  async update(id: number, data: Partial<Student>): Promise<Student | null> {
    const student = await studentRepository.findOneBy({ id });
    if (!student) return null;
    Object.assign(student, data);
    return studentRepository.save(student);
  }

  async delete(id: number): Promise<boolean> {
    const result = await studentRepository.delete(id);
    return result.affected !== 0;
  }
}
