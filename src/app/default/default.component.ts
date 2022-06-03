import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { filter, pairwise } from 'rxjs/operators';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  employe?: Employe;
  isLoggedIn = false;
  nomEmp?: string;

  role?: any;
  previousUrl?: string;
  currentUrl?: string;
  messages : any
  employeSelected : any
  show : any
  constructor(private authService: AuthService, private router: Router) {
   
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.LoggedIn();
    if (this.isLoggedIn == true) {
      this.getAuth();
    } else {
      this.router.navigate(['/login']);
    }
   

  }

  open() {
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAuth() {
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
      this.nomEmp = res.prenomEmp;
      switch (res.role) {
        case 0:
          this.role = 'Admin';
          break;
        case 1:
          this.role = 'Assistant';
          break;
        case 2:
          this.role = 'Agent';
          break;
        default:
          break;
      }
    });
  }

  select(event:any){
    this.employeSelected = event
    console.log(this.employeSelected)
    this.show = true
    
  }


  deselect(event:any){
    if(event)
    this.employeSelected = undefined

    
  }


}
