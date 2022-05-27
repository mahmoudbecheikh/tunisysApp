import { Employe } from "./employe";
import { Ticket } from "./ticket";

export class Notification {
    _id?: string;
    envoyeur?: Employe;
    recepteur?: Employe;
    contenu?: string;
    ticket? : Ticket ; 
    lue? : boolean ; 
    date? : string ; 


}
