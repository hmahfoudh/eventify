import { Category } from "./category";
import { Media } from "./media";

export class Product {

    id: number;
    name: string;
    description: string;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
    basePrice: number;
    productImages: Media[];
    category: Category;

}