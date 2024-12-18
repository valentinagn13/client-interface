import { Administrator } from "./administrator.model";

export class Service {
  id?: number;
  name: string;
  address: string;
  description: string;
  date: Date;
  administrator?:Administrator
}
