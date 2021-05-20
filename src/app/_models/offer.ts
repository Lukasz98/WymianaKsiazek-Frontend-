import {Book} from "./book";
import {Address} from "./address"
export interface Offer {
    imgSrc: string,
    id: number,
    content: string,
    createdOn: string,
    updatedOn: string,
    imgName1: string,
    imgName2: string,
    imgName3: string,
    icon: number,
    type: boolean,
    price: number,
    address: Address,
    book: Book,
    user: string
    }