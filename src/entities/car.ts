
import { ImgData } from "../types/img.data"
import { User } from "./user"

export type Make = 'Alfa Romeo' | 'Aston Martin' | 'Audi' |'Bentley' | 'BMW' | 'Cadillac' |'Chevrolet' | 'Citröen' | 'Ferrari' |'Ford' | 'Jaguar' | 'Lamborghini' |'Lancia' | 'Lotus' | 'Mercedes Benz' |'Mini' | 'Morgan' | 'Peugeot' |'Porsche' | 'Renault' | 'Seat' | 'VolksVagen';

export type Car = {
  id: string,
  make: Make,
  model: string,
  color: string,
  year: number,
  author: User,
  info: string,
  picture: ImgData,
}
