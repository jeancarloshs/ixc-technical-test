import mongoose, { Schema, Document } from 'mongoose';

interface IChat {
  id: string;
  receveidID: string;
  sendToID: string;
  name: string;
  messages: Array<string>;
  created_at: Date;
}

class ChatModel extends mongoose.Model<IChat> {
  id!: string;
  name!: string;
  messages!: Array<string>;
  created_at!: Date;
}

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  receivedID: {
    type: String,
    required: true
  },
  sendToID: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

chatSchema.loadClass(ChatModel);
const chatModel = mongoose.model<IChat>('chat', chatSchema);
export default chatModel;