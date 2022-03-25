import { Employe } from "./employe";
import { Ticket } from "./ticket";

export class Departement {
    _id?: string;
    nom? : string;
    employes? :Employe[];
    tickets? : Ticket[]
}

