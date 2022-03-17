import { Departement } from "./departement";
import { Employee } from "./employee";

export class Ticket {
    _id?: string;
    subject?: string;
    departement? : Departement;
    employee? :Employee ;
    description? : string ;
    manual?: string;
    status? : string
    clientEmail?: string;
    clientFullName?: number;
    clientTel?: number;
    date?: string;
    dateUpdated?: string;
}

