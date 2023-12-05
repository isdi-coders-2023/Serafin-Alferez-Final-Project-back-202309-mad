import { Schema, model } from 'mongoose';
import { User } from '../../entities/user.js';


const usersSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwd: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  surname: String, 
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    }
  ] 
});

usersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', usersSchema, 'users');
