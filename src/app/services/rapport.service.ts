import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rapport } from 'src/models/rapport';

@Injectable({
  providedIn: 'root',
})
export class RapportService {
  readonly baseURL = 'http://localhost:3000/rapports';

  constructor(private http: HttpClient) {}

  ajouter(rapport: any): Observable<any> {
    return this.http.post(this.baseURL, rapport);
  }

  uploadFiles(data: any) {
    return this.http.post(this.baseURL + '/fichiers', data);
  }

  afficherId(id: any): Observable<Rapport> {
    return this.http.get(this.baseURL + `/${id}`);
  }

  modifier(id: any, rapport: any): Observable<any> {
    return this.http.put(this.baseURL + `/${id}`, rapport);
  }


}
