import { Category } from "./category";
import { Product } from "./product";

export class SubCategory {
    _id?: string;
    title? : string;
    category? : Category
    products? : Array<Product>
}

