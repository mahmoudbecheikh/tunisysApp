import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employe[] = [];
  alphabet1 = ["a","b","c","d","e","f","g"];
  alphabet2 = ["i","j","k","l","m"];
  alphabet3 = ["n","o","p","q","r","s"];
  alphabet4 = ["t","u","v","w","x","y","z"];

  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.empService.afficherListe().subscribe((res) => {
      this.employees = res as Employe[];
    });
  }
  toAdd() {
    this.router.navigate(['admin/employees/add']);
  }

  goToUpdate(id: any) {
    const link = ['admin/employees/update/', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {
    this.empService.supprimer(id).subscribe((res) => {
      this.afficherListe()
    });
  }

  index(alphabets:string[],c:any){
    return alphabets.includes(c)
  }

}
