export class Product {
  id: number;
  name: string;
  description: string;
  expiration_date: Date;
  client_id: number;
  batch_id: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.expiration_date = new Date();
    this.client_id = 0;
    this.batch_id = 0;
  }
}
