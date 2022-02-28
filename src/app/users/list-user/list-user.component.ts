import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users : User[] = []

  constructor(private userService : UsersService , private router : Router) { }

  ngOnInit(): void {
    this.getListUser();
  }

  getListUser() {
    this.userService.listUser().subscribe((res) => {
      this.users = res as User[];
    });
  }

  toAdd(){
    this.router.navigate(['users/add']) ; 
  }

}
