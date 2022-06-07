import { Employe } from "./employe";
import { Message } from "./message";

export class Conversation {
    _id?: string;
    messages?: Message [];
    membres?: Employe [];
    date? : string

    
}
