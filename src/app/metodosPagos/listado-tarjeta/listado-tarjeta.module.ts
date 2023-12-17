import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoTarjetaPageRoutingModule } from './listado-tarjeta-routing.module';

import { ListadoTarjetaPage } from './listado-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoTarjetaPageRoutingModule
  ],
  declarations: [ListadoTarjetaPage]
})
export class ListadoTarjetaPageModule {}
