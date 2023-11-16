import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoInfoPageRoutingModule } from './pedido-info-routing.module';

import { PedidoInfoPage } from './pedido-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoInfoPageRoutingModule
  ],
  declarations: [PedidoInfoPage]
})
export class PedidoInfoPageModule {}
