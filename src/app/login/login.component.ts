import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('.*com$'),
  ]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router,private mailService : MailService) {}

  ngOnInit(): void {
    this.createForm();
    this.readMails();
  }

  createForm() {
    this.myForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  onLogin() {
    this.authService.login(this.myForm.value).subscribe((res) => {
      if (res.token) 
      {
        localStorage.setItem('token', res.token)
        if (this.authService.LoggedIn())      
        this.router.navigate(['/admin']);
      }
    });
  }

  readMails(){
    this.mailService.readMails().subscribe(res=>{
      console.log(res)
    })
  }

}
