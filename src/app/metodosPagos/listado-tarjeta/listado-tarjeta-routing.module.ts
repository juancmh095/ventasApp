import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoTarjetaPage } from './listado-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoTarjetaPageRoutingModule {}
