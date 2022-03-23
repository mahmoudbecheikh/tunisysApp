import { Departement } from "./departement";

export class Employe {
    _id?: string;
    nomEmp?: string;
    departement? : Departement ;
    cin? : number ;
    email?: string;
    mdp?: string;
    adresse?: string;
    role?: number;
    tel? : number
}

