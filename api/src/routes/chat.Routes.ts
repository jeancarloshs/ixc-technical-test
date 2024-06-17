import express from 'express';
import ChatController from '../controllers/chatController';
import authMiddleware from '../middleware/jwt';

const router = express.Router();

router
  .post('/api/v1/sent/message', authMiddleware.verifyJWT, ChatController.sendMessage)

export default router;