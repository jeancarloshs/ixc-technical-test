import { Request, Response } from 'express';
import md5 from 'md5';
import UserModel from '../database/models/userModel';
import jwt from "../middleware/jwt";
const SECRET = process.env.SECRET;

class UserController {
    static userLogin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const getUser = await UserModel.findOne({ email });
            if (!getUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const passwordMD5 = md5(password);
            if (passwordMD5 !== getUser.password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const payload = {
                userID: getUser._id
            }

            const token = jwt.sign(payload);

            const objAuth = {
                message: 'Login successful',
                userID: getUser._id,
                name: getUser.name,
                email: getUser.email,
                token: token
            }

            res.status(200).json({ message: 'Login successful', objAuth });
        } catch (error) {
            res.status(500).json({ message: `${error.message}` });
        }
    }

    static userRegister = async (req: Request, res: Response) => {
        try {
            const { password, ...userData } = req.body;
            const passwordMD5 = md5(password);
            const newUser = new UserModel({ ...userData, password: passwordMD5 });
            await newUser.save();
            return res.status(201).send(newUser);
        } catch (error) {
            console.error('Error registering user:', error.message);
            return res.status(500).json({ message: 'Failed to register user. Please try again later.' });
        }
    }

    static userUpdate = async (req: Request, res: Response) => {

    }

    static userDelete = async (req: Request, res: Response) => {

    }
}

export default UserController;