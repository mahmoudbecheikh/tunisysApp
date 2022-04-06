import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TunisysApp';

  constructor() {}

  ngOnInit(): void {
    // let btn = document.querySelector('#btn');
    // let sidebar = document.querySelector('.sidebar');
    // let searchBtn = document.querySelector('.bx-search');
    // this.isLoggedIn = this.authService.LoggedIn();
    // console.log(btn);
    // btn?.addEventListener('click', () => {
    //   sidebar?.classList.toggle('active');
    // });
    // searchBtn?.addEventListener('click', () => {
    //   sidebar?.classList.toggle('active');
    // });
  }
}
