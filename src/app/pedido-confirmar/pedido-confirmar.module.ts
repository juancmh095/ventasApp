import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoConfirmarPageRoutingModule } from './pedido-confirmar-routing.module';

import { PedidoConfirmarPage } from './pedido-confirmar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoConfirmarPageRoutingModule
  ],
  declarations: [PedidoConfirmarPage]
})
export class PedidoConfirmarPageModule {}
