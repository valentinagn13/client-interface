import { Municipality } from "./municipality.model";

export class Department {
    id?: number;
    name: string;
    description: string;
    city_capital_id: number;
    municipalities: number;
    surface: number;
    population: number;
    phone_prefix: string;
    country_id: number;
    region_id: number;
    municipalitiest?: Municipality[];

}
