import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoDireccionesPageRoutingModule } from './listado-direcciones-routing.module';

import { ListadoDireccionesPage } from './listado-direcciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoDireccionesPageRoutingModule
  ],
  declarations: [ListadoDireccionesPage]
})
export class ListadoDireccionesPageModule {}
