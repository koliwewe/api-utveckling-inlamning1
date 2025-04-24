export class Product {
    id: number;
    title: string;
    description: string;
    stock: number;
    price: number;
    image: string;
    created_date: string;

    constructor(
    id: number,
    title: string,
    description: string,
    stock: number,
    price: number,
    image: string,
    created_date: string

  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.image = image;
    this.created_date = created_date;
  }

}