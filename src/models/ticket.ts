import { Departement } from './departement';
import { Employe } from './employe';
import { FeedBack } from './feedBack';
import { Rapport } from './rapport';

export class Ticket {
  _id?: string;
  ref?: number;
  sujet?: string;
  departement?: Departement;
  employe?: Employe;
  description?: string;
  manuel?: string;
  statut?: string;
  emailClient?: string;
  nomClient?: string;
  telClient?: number;
  rapport?: Rapport;
  adresse?: string;
  siteWeb?: string;
  fJoint?: any[];
  tags?: string[];
  collaborateurs?: Employe[];
  rappelle?: boolean;
  feedBack?: any;
  date?: string;
  dateModif?: string;
  dateLimite?: string;
  dateFaire?: string;
  dateCours?: string;
  dateResolu?: string;
  avisJeton? : string
  avisJetonExp? : string
  jetonUtilise? : string
  // static date: string | number | Date;
}
