import { Batch } from "./batch.model";

export class Addrerouteorder {
    id?: number;
    address_id: number;
    route_id: number;
    order_by:number;
    batch?:Batch
}
