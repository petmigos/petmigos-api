import { IHygieneService } from "../../ports/ihygiene_service";


export class DeleteHygiene {
  constructor(private readonly hygieneService: IHygieneService) {}

  async execute(hygieneId: string): Promise<void> {
    this.hygieneService.delete(hygieneId);
  }
}
