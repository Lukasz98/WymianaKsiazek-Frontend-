import { Message } from "./message";

export class Contact {
    id: string;
    userName: string;
    sentMessages: Array<Message>;
    recvMessages: Array<Message>;
}