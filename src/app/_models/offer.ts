import {Book} from "./book";
import {Address} from "./address"
export interface Offer {
    imgSrc: string,
    id: number,
    content: string,
    createdOn: string,
    updatedOn: string,
    type: boolean,
    price: number,
    address: Address,
    book: Book,
    user: string
    }