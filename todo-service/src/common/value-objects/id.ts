export class Id {
  private constructor(private _id: string) {}

  static generate(): Id {
    return new Id(crypto.randomUUID());
  }

  get value(): string {
    return this._id;
  }
}
