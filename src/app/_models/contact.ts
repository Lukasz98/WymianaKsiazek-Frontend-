import { Message } from "./message";

export class Contact {
    userId: string;
    userName: string;
    messages: Array<Message>;
}