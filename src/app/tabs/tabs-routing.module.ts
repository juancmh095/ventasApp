import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/home/tab1',
        pathMatch: 'full'
      },
      {
        path: 'direcciones',
        loadChildren: () => import('../direcciones/agregar-direccion/agregar-direccion.module').then( m => m.AgregarDireccionPageModule)
      },
      {
        path: 'direcciones/listado',
        loadChildren: () => import('../direcciones/listado-direcciones/listado-direcciones.module').then( m => m.ListadoDireccionesPageModule)
      },

      {
        path: 'carrito',
        loadChildren: () => import('../carrito/carrito.module').then( m => m.CarritoPageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then( m => m.PedidosPageModule)
      },
      {
        path: 'agregar-tarjeta',
        loadChildren: () => import('../metodosPagos/agregar-tarjeta/agregar-tarjeta.module').then( m => m.AgregarTarjetaPageModule)
      },
      {
        path: 'listado-tarjeta',
        loadChildren: () => import('../metodosPagos/listado-tarjeta/listado-tarjeta.module').then( m => m.ListadoTarjetaPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
