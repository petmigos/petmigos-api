interface PetInfo {
  id: number;
  name: string;
  type: PetType;
  birthday: Date;
  gender: Gender;
  tags: Tag[];
  vaccines: Vaccine[];
  allergies: Allergy[];
  hygienes: Hygiene[];
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Pet {
  constructor(public data: PetInfo) {}
}

const pet = new Pet({});
