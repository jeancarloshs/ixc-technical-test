import express from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middleware/jwt';

const router = express.Router();

router
  .get('/api/v1/users', authMiddleware.verifyJWT, UserController.getAllUsers)
  .post('/api/v1/user/login', UserController.userLogin)
  .post('/api/v1/user/create', UserController.userRegister)

export default router;