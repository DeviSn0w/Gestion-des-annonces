import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AddAnnoncePage } from './add-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: AddAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) , ReactiveFormsModule],
  exports: [RouterModule],
})
export class AddAnnoncePageRoutingModule {}
