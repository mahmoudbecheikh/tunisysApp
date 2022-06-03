import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  error: String = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: this.email,
    });
  }

  envoyer() {
    this.authService.forget(this.myForm.value).subscribe((res) => {
      if (res == null) {
        this.error = "Adresse email invalide";
      }
      if (res.send == true) {
        this.toastr.success('', 'Email envoyé avec succés');
        this.error = ''
        this.myForm.reset();
      } else {
        this.error = "Une erreur s'est produite lors de l'envoi";
        this.myForm.reset();
      }
    });
  }
}
