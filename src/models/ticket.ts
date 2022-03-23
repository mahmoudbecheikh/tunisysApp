import { Departement } from "./departement";
import { Employe } from "./employe";

export class Ticket {
    _id?: string;
    ref?:number;
    sujet?: string;
    departement? : Departement;
    employe? :Employe ;
    description? : string ;
    manuel?: string;
    statut? : string
    emailClient?: string;
    nomClient?: number;
    tel?: number;
    date?: string;
    dateModif?: string;
    rapport? : string;
    adresse? : string;
    siteWeb? : string;
    fJoint? : string;
    tags? : string;
    
}

