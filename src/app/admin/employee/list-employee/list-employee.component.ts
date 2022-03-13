import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getListEmp();
  }

  getListEmp() {
    this.empService.listEmployee().subscribe((res) => {
      this.employees = res as Employee[];
    });
  }
  toAdd() {
    this.router.navigate(['admin/employees/add']);
  }

  goToUpdate(id: any) {
    const link = ['admin/employees/update/', id];
    this.router.navigate(link);
  }

  onDelete(id: any) {
    this.empService.deleteEmployee(id).subscribe((res) => {
      this.getListEmp()
    });
  }
}
