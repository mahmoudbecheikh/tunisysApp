import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
})
export class ChangeComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  password: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6)],
  });
  newPassword: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6)],
  });
  confirmPassword: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6)],
  });

  error?: Boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      password: this.password,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    });
  }

  changer() {
    this.authService.getAuth().subscribe((res) => {
      console.log(res);
      this.authService
        .change(this.myForm.value, res._id)
        .subscribe((response) => {
          console.log(response.error);
          if (response.error == true) this.error = true;
          else this.router.navigate(['/admin']);
        });
    });
    console.log(this.myForm.value);
  }
}
