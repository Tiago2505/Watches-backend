export class CreateWatchDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly images: string[],
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateWatchDto?] {
    const { name, description, brand, price, imagesUrl } = props;

    if (!name) return ["The name is empty or was not found."];
    if (!description) return ["The description is empty or was not found."];

    if (!brand) return ["The brand is empty or was not found."];

    if (price < 0) return ["Price must be greater than zero"];

    if (price === undefined) return ["Missing price"];


    return ["", new CreateWatchDto(name, description, brand, Number(price), imagesUrl)];
  }

}
