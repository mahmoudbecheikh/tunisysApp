import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntService } from 'src/app/services/emprunt.service';
import { Emprunt } from 'src/models/emprunt';

@Component({
  selector: 'app-list-emprunt',
  templateUrl: './list-emprunt.component.html',
  styleUrls: ['./list-emprunt.component.css']
})
export class ListEmpruntComponent implements OnInit {
  emprunts: Emprunt[] = [];
 constructor(private empService: EmpruntService, private router: Router) {}

  ngOnInit(): void {
    this.getListEmp();
  }

  getListEmp() {
    this.empService.listEmprunt().subscribe((res) => {
      this.emprunts = res as Emprunt[];
    });
  }

  onDelete(id: any) {
    this.empService.deleteEmprunt(id).subscribe((res) => {
      this.getListEmp()
    });
  }

  onConfirm(id: any){
    this.empService.confirmerEmprunt(id).subscribe((res=>{
    }))
  }
}
