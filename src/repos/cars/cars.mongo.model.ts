import { Schema, model } from 'mongoose';
import { Car } from '../../entities/car.js';


const carsSchema = new Schema<Car>({
  id: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  year: {
    type: Number,
  },
  info: {
    type: String,
  },
  picture: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },
});

carsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const CarModel = model('Car', carsSchema, 'cars');
