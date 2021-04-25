import { Address } from "./address";
import {Offer} from "./offer";

export class User {
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    userName:string;
    address:Address;
    offers:Array<Offer>;
}