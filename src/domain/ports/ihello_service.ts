import { User } from "../entities/user";

export interface IHelloService {
  generateGreetingsMessage(user: User): string;
}
