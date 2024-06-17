import { Request, Response } from 'express';
import chatModel from '../database/models/chatModel';

class ChatController {
  static sendMessage = async (req: Request, res: Response) => {
    const { ...messageData } = req.body;
    try {
      const newMessage = new chatModel({ ...messageData });
      await newMessage.save();
      res.status(200).send({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message", error);
      res.status(500).send({ message: "Error sending message" });
    }
  }
}

export default ChatController;