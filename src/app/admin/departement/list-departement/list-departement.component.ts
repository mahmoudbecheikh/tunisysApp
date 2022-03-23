import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { Departement } from 'src/models/departement';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {

  departements: Departement[] = [];

  constructor(private depService: DepartementService, private router: Router) {}

  ngOnInit(): void {
    this.getListDep();
  }

  getListDep() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }
  toAdd() {
    this.router.navigate(['admin/departements/add']);
  }

  goToUpdate(id: any) {
    const link = ['admin/departements/update/', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {
    this.depService.supprimer(id).subscribe((res) => {
      this.getListDep()
    });
  }

}
