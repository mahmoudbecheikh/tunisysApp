import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly baseURL = 'http://localhost:3000/users';

  constructor(private http : HttpClient) { }

  addUser(user: User) : Observable<any> {
    return this.http.post(this.baseURL, user);
  }

  listUser() {
    return this.http.get(this.baseURL);
  }

  updateUser(user: User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
