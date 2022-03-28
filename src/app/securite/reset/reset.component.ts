import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  password: FormControl = new FormControl('', {
    validators: [Validators.required],
  });

  confirmPassword: FormControl = new FormControl('', {
    validators: [Validators.required],
  });

  error?: Boolean = false;
  invalid?: Boolean = false;
  tokenExpire: any;
  token: any;
  constructor(
    private authService: AuthService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
    this.tokenExpire = this.activateRouter.snapshot.params['tokenExpire'];
    this.token = this.activateRouter.snapshot.params['token'];
    if (this.tokenExpire < Date.now()) this.invalid = true;
  }

  changer() {
    this.authService.reset(this.myForm.value, this.token).subscribe((res) => {
      if (res.employe) {
        let data = {
          email: res.employe.email,
          mdp: this.password.value,
        };
        this.authService.login(data).subscribe((res) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            let role = this.authService.getRole();
            switch (role) {
              case 0:
                this.router.navigate(['/admin']);
                break;
              case 1:
                this.router.navigate(['/assistant']);
                break;
              case 2:
                this.router.navigate(['/assistant']);
                break;
            }
          }
        });
      } else {
        if (res.invalid == true) this.invalid = true;
        if (res.error == true) this.error = true;
        this.myForm.reset();
      }
    });
  }
}
