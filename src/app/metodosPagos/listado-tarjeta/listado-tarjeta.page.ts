import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarTarjetaPage } from '../agregar-tarjeta/agregar-tarjeta.page';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-listado-tarjeta',
  templateUrl: './listado-tarjeta.page.html',
  styleUrls: ['./listado-tarjeta.page.scss'],
})
export class ListadoTarjetaPage implements OnInit {
  tarjetas:any = [];
  tarjeta:any = {};
  constructor(
    private modalCtrl: ModalController,
    private _api: ApiService
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
    this._api.get('tarjetas', model).then((response:any) => {
      console.log(response);
      this.tarjetas = response.data;
      this.loadTarjetaCargada();
    });
  }

  async loadTarjetaCargada(){
    var dirC:any = await localStorage.getItem('mPagoVT');
    this.tarjeta = JSON.parse(dirC);
  }

  changeTar(item:any){
    try {
      var dir = JSON.stringify(item);
      this.tarjeta = item;
      var tar = localStorage.setItem('mPagoVT',dir);
      this.modalCtrl.dismiss('confirmar', 'confirm');
    } catch (error) {
      console.log(error);
    }
  }


  async loadModalCart(){
    const modal = await this.modalCtrl.create({
      component: AgregarTarjetaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.loadData();
    }

  }
}
