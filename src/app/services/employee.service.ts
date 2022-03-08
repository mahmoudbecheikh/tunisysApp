import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly baseURL = 'http://localhost:3000/employees';

  constructor(private http : HttpClient) { }

  addEmployee(employee: Employee) : Observable<any> {
    return this.http.post(this.baseURL, employee);
  }

  listEmployee() {
    return this.http.get(this.baseURL);
  }
  getById(id: any):Observable<Employee> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  updateEmployee(id : any,employee: Employee) :Observable<Employee>{
    return this.http.put(this.baseURL + `/${id}`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


  getByCin(cin: number):Observable<any> {
    return this.http.get(this.baseURL + `/emp/${cin}`);
  }

  getByEmail(email: String):Observable<any> {
    return this.http.get(this.baseURL + `/employee/${email}`);
  }

}
