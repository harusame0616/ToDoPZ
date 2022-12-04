export class Id {
  static readonly LENGTH = 36;

  constructor(private _id: string) {}

  static generate(): Id {
    return new Id(crypto.randomUUID());
  }

  get value(): string {
    return this._id;
  }

  equals(id: Id) {
    return this._id === id.value;
  }
}
