import { Employe } from "./employe";
import { Ticket } from "./ticket";

export class Reclamation {
    _id?: string;
    raison?: string;
    employe?: Employe;
    ticket? : Ticket ;
    date? : string

}
