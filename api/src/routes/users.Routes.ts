import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router
  .post('/api/v1/user_login', UserController.userLogin)
  .post('/api/v1/user_create', UserController.userRegister)

export default router;