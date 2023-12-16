import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { AddAnnoncePageRoutingModule } from './add-annonce-routing.module';

import { AddAnnoncePage } from './add-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAnnoncePageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [AddAnnoncePage]
})
export class AddAnnoncePageModule {}
