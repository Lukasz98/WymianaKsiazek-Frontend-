import {Book} from "./book";
import {Address} from "./address"
export interface Offer {
    id: number,
    content: string,
    createdOn: string,
    updatedOn: string,
    type: boolean,
    price: number,
    imgName1: string,
    imgName2: string,
    imgName3: string,
    icon: number,

    address: Address,
    book: Book,
    user: string
    }