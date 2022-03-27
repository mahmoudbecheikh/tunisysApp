import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private authService:AuthService,private activateRouter : ActivatedRoute) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      password: this.password,
      confirmPassword : this.confirmPassword
    });
  }


  changer(){
    let id = this.activateRouter.snapshot.params['id']
    let token = this.activateRouter.snapshot.params['token']

    this.authService.changer(this.myForm.value,id,token).subscribe(res=>{
      console.log(res)
    })
  }

}
