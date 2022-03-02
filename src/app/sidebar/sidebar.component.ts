import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  admin? : Employee
  isLoggedIn = false ;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.LoggedInAdmin();
    if(this.isLoggedIn==true)
    this.getAdmin()
  }

  logout () { 
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getAdmin(){
    this.authService.getAdmin().subscribe(res=>{
      this.admin = res; 
    })
  }

}
