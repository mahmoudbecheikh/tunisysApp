import { Departement } from "./departement";

export class Employe {
    _id?: string;
    nomEmp?: string;
    prenomEmp?: string;
    departement? : Departement ;
    cin? : number ;
    email?: string;
    mdp?: string;
    adresse?: string;
    role?: number;
    tel? : number;
    token? : string;
    mdpJeton? : string ;
    mdpJetonExp? : string ; 
    jetonUtilise? : string
}

