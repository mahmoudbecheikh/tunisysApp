import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  email: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
  });

  constructor(private authService :AuthService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: this.email,
    });
  }

  envoyer(){
    this.authService.forget(this.myForm.value).subscribe(res=>{
      console.log(res)
    })
  }

}
