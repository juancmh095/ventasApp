import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoDireccionesPage } from './listado-direcciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoDireccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoDireccionesPageRoutingModule {}
