import { Injectable } from '@angular/core';
import { map, Observable, Subscriber } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  readonly baseURL = 'http://localhost:3000';

  constructor(private socket: Socket) {}


  listen(eventName : string) : Observable<any>{

    return this.socket.fromEvent(eventName) ;
  }

  emit(eventName : string , data :any){
    this.socket.emit(eventName,data)
  }

}
