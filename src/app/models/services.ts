import { Category } from "./category";
import { Media } from "./media";

export class Services {

    id: number;
    name: string;
    description: string;
    basePrice: number;
    contactService:String;
    serviceAddress:String;
    categoryImages: Media[];
    category: Category;

}