import { Car } from "./car";


export type LoginUser = {
  email: string;
  passwd: string;
}

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  cars: Car[];
}
