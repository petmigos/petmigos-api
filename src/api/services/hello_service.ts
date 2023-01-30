import { User } from "../../domain/entities/user";
import { IHelloService } from "../../domain/ports/ihello_service";
export class HelloService implements IHelloService {
  generateGreetingsMessage(user: User): string {
    return "Saudações amigo " + user.name + "! Oláaaaa!";
  }
}
