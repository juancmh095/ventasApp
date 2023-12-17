import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTarjetaPageRoutingModule } from './agregar-tarjeta-routing.module';

import { AgregarTarjetaPage } from './agregar-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTarjetaPageRoutingModule
  ],
  declarations: [AgregarTarjetaPage]
})
export class AgregarTarjetaPageModule {}
