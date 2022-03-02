import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
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
        if (this.authService.LoggedInAdmin())      
        this.router.navigate(['/admin']);
      }
    });
  }
}
