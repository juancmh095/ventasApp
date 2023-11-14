import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoConfirmarPage } from './pedido-confirmar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoConfirmarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoConfirmarPageRoutingModule {}
