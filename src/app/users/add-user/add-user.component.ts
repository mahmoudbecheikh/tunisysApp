import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  myForm : FormGroup = new FormGroup({});
  first : FormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)")])
  last : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  cin : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  email : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  password : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  phone : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  role : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  adresse : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])
  codeP : FormControl = new FormControl('',[Validators.required,Validators.minLength(3)])

  constructor(private userService : UsersService,private router : Router) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm (){
    this.myForm = new FormGroup({
      first : this.first , 
      last : this.last ,
      cin : this.cin,
      email : this.email,
      password : this.password,
      phone : this.phone,
      role : this.role,

    })
  }

  return(){
    this.router.navigate(['users']) ; 
  }

  onSubmit(){
    this.userService.addUser(this.myForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigate(['users']) ; 

    })
  }
}
