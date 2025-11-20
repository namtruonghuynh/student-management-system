import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/db.config";
import { User } from "../entities/user";

interface RegisterDTO {
     name: string;
     email: string;
     password: string;
}

interface LoginDTO {
    email: string;
    password: string;
}

// Hàm tiện ích tạo token (để tránh lặp code)
const generateToken = (user: User) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        "SECRET_KEY", // VUI LÒNG DÙNG process.env.JWT_SECRET
        { expiresIn: "1d" }  );
}

class AuthService {
    userRepository = AppDataSource.getRepository(User);
    
    // Xử lý đăng ký (ĐÃ SỬA)
    async register({ name, email, password }: RegisterDTO) {
        const exists = await this.userRepository.findOne({ where: { email } });
        if (exists) throw new Error("Email already exists");

        const hashed = await bcrypt.hash(password, 10);
        
        const newUser = this.userRepository.create({
            name,
            email,
            password: hashed
        });

        // LƯU Ý: Phải await save để newUser có ID hợp lệ
        const savedUser = await this.userRepository.save(newUser); 

        // 1. TẠO VÀ TRẢ VỀ TOKEN
        const token = generateToken(savedUser);
        
        return { message: "Register success!", token }; // <--- ĐÃ TRẢ VỀ TOKEN
        
    }
    
    // Xử lý đăng nhập (ĐÃ HOÀN HẢO)
    async login({ email, password }: LoginDTO) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Wrong password");
        
        const token = generateToken(user); // Sử dụng hàm tiện ích
        
        return { message: "Login success!", token};
    }
    
    async getAllUsers() {
        return this.userRepository.find();
    }
}

export default new AuthService();