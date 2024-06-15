import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

class UserClass extends mongoose.Model<IUser> {
  name!: string;
  email!: string;
  password!: string;
  created_at!: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.loadClass(UserClass);

const UserModel = mongoose.model<IUser>('users', userSchema);

export default UserModel;
