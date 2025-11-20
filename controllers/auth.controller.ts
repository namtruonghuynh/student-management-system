import { Request, Response } from "express";
import AuthService from "../services/auth.service";


class AuthController {
    async register(req: Request, res: Response) {
        const result = await AuthService.register(req.body);
        return res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const result = await AuthService.login(req.body);
        return res.status(200).json(result);
    }

    async getAllUsers(req: Request, res: Response) {
        const result = await AuthService.getAllUsers();
        return res.status(200).json(result);
    }
}

export default new AuthController();