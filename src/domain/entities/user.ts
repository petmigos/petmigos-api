export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
