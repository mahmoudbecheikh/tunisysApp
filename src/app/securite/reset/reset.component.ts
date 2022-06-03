import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

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
  valid?: Boolean = true;
  tokenExpire: any;
  token: any;
  constructor(
    private authService: AuthService,
    private employeService : EmployeeService,
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
    if (!isNaN(this.tokenExpire)) {
      this.employeService.afficherTokenMdp(this.token, this.tokenExpire)
        .subscribe((res) => {
          if (res) {
            if (res?.jetonUtilise) this.valid = false;
          } else {
            this.valid = false;
          }
        });
    } else {
      this.valid = false;
    }
  }

  changer() {
    this.authService.reset(this.myForm.value, this.token).subscribe((res) => {
      if (res.employe) {
        let data = {
          email: res.employe.email,
          mdp: this.password.value,
        };
        this.authService.login(data).subscribe((res) => {
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
        if (res.invalid == true) this.valid = true;
        if (res.error == true) this.error = true;
        this.myForm.reset();
      }
    });
  }
}
