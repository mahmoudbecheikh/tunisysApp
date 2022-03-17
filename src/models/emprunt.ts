import { Employee } from "./employee";
import { Product } from "./product";

export class Emprunt {
    _id?: string;
    product?: Product;
    employee? : Employee;
    quantity? : number ;
    date?: string;
    returnDate? : string;
    type? : string;
    etat? : string
}

