import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employe[] = [];
  employe?: Employe;
  colors: string[] = [];
  constructor(
    private empService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.empService.afficherListe().subscribe((res) => {
      this.employees = res as Employe[];
      this.rand(res);
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
      console.log(res)
      this.afficherListe();

    });
    this.authService.getAuth().subscribe((emp) => {
      if (emp._id == id) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  index(alphabets: string[], c: any) {
    return alphabets.includes(c);
  }

  rand(array: any) {
    let i = 0;
    let colors = ['#f07167', '#FA8072', '#26978B', '#C70039', '#FFCE5F'];
    while (i <= array.length) {
      var item = colors[Math.floor(Math.random() * colors.length)];
      this.colors.push(item);
      i++;
    }
  }
}
