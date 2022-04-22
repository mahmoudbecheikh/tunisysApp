import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results : any ;
  constructor() { }

  ngOnInit(): void {
  }

  fwdMsgToSib2($event :any) { this.results = $event; }
}
