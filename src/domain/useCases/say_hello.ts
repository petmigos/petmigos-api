import { IHelloService } from "../ports/ihello_service";

export class SayHello {
  constructor(private readonly helloService: IHelloService) {}

  execute(name?: string) {
    const fullName = `${name || "Petdev"}(dev do Petmigos)`;
    return this.helloService.generateGreetingsMessage({ name: fullName });
  }
}
