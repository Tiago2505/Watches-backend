export class UpdateWatchDto {

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly images: string[],
  ) {}

  static update(props: {[key: string]: any}):[string?, UpdateWatchDto?]{

    const {id, name, description, brand, price, imagesUrl} = props;

    if(!id) return ['Missing id'];

    if(id < 0 || id ===0) ['Invalid id'];

    if(typeof id !== 'number') ['Invalid id'];

    if (!name) return ["The name is empty or was not found."];
    if (!description) return ["The description is empty or was not found."];

    if (!brand) return ["The brand is empty or was not found."];

    if (price < 0) return ["Price must be greater than zero"];

    if (price === undefined) return ["Missing price"];


    return ["", new UpdateWatchDto(id, name, description, brand, Number(price), imagesUrl)];

  }
}
