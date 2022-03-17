import { SubCategory } from "./subcategory";

export class Product {
    _id?: string;
    title?: string;
    ref? : string;
    quantity? : number ;
    description?: string;
    subCategory? : SubCategory
}

