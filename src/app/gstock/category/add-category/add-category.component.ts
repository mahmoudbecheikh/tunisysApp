import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatorTitle()],
    updateOn: 'blur',
  });
  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: this.title,
    });
  }

  returnToList() {
    this.router.navigate(['stock/categories']);
  }
  onSubmit() {
    this.stockService.addCategory(this.myForm.value).subscribe((res) => {
      this.router.navigate(['stock/categories']);
    });
  }

  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getCategoryByTitle(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res.length > 0 ? { titleExist: true } : null;
        })
      );
    };
  }

}
