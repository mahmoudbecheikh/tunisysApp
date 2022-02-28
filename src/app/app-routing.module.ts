import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';

const routes: Routes = [
  {
    path : "users" , component : ListUserComponent
  },
  {
    path : "users/add" , component : AddUserComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
