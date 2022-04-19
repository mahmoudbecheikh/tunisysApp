import { Departement } from "./departement";
import { Employe } from "./employe";
import { Rapport } from "./rapport";

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
    telClient?: number;
    date?: string;
    dateModif?: string;
    rapport? : Rapport ;
    adresse? : string;
    siteWeb? : string;
    fJoint? : [];
    tags? : [];
    collaborateurs? : string [];
    feedBack? : any
  static date: string | number | Date;
    
}

