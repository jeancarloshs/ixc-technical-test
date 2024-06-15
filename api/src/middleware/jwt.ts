import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    userID?: string;
}

class AuthMiddleware {
    private readonly SECRET: string = process.env.SECRET || 'abcdefghijklmnopqrstuvwxy';
    public sign(payload: any): string {
        return jwt.sign(payload, this.SECRET, { expiresIn: '1h' });
    };

    public verifyJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(403).json({ error: "Invalid authorization header" })
        }

        const token = authorizationHeader.split(" ")[1];

        const tokenToVerify: string | string[] = token;

        jwt.verify(tokenToVerify.toString(), this.SECRET, (error: any, decode: any) => {
            if (error) {
                return res.status(401).json({ error: "Unauthorized token" });
            }
            req.userID = decode.userID;
            next();
        })
    }
}

const authMiddleware = new AuthMiddleware();
export default authMiddleware;