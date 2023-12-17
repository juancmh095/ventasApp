import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { AgregarDireccionPage } from '../agregar-direccion/agregar-direccion.page';

@Component({
  selector: 'app-listado-direcciones',
  templateUrl: './listado-direcciones.page.html',
  styleUrls: ['./listado-direcciones.page.scss'],
})
export class ListadoDireccionesPage implements OnInit {
  direcciones:any = [];
  direccion:any = {};
  constructor(
    private _api:ApiService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    var usr:any = await localStorage.getItem('userData');
    var usuario = JSON.parse(usr);
    let model = {
      usuario: usuario._id
    };
    this._api.get('direcciones', model).then((response:any) => {
      console.log(response);
      this.direcciones = response.data;
      this.loadDireccionCargada();
    });
  }

  async loadDireccionCargada(){
    var dirC:any = await localStorage.getItem('myDireccionVT');
    this.direccion = JSON.parse(dirC);
  }

  changeDir(item:any){
    try {
      var dir = JSON.stringify(item);
      this.direccion = item;
      var direccion = localStorage.setItem('myDireccionVT',dir);
      this.modalCtrl.dismiss('confirmar', 'confirm');
    } catch (error) {
      console.log('no es modal')
    }
  }

  async loadModalDir(){
    const modal = await this.modalCtrl.create({
      component: AgregarDireccionPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.loadData();
    }

  }


}
