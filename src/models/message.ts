import { Conversation } from "./conversation";
import { Employe } from "./employe";

export class Message {
    _id?: string;
    envoyeur?: Employe;
    contenu?: string;
    conversation? : Conversation ; 
    lue? : boolean ; 
    fJoint? : any[] ; 
    date? : string ; 

}
