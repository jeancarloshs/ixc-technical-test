import mongoose, { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

class UserClass extends mongoose.Model {
  name!: string;
  email!: string;
  password!: string;
  created_at!: Date;
}

const userSchema = new Schema<IUser>({
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

const User = model<IUser, typeof UserClass>('User', userSchema);
export default User;