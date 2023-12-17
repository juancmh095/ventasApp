import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.page.html',
  styleUrls: ['./agregar-tarjeta.page.scss'],
})
export class AgregarTarjetaPage implements OnInit {

  model:any = {};

  constructor(
    private modalCtrl: ModalController,
    private _utils: UtilsService,
    private _api:ApiService
  ) { }

  ngOnInit() {
  }


  async save(){
    var usr:any = await localStorage.getItem('userData');
    var usuario = JSON.parse(usr);
    this.model.usuario = usuario._id;
    if(this.model.numero && this.model.nombre && this.model.cvv && this.model.mes && this.model.anio){
      this._utils.spinner();
      this._api.post('tarjetas',this.model).then(async(response:any)=>{
        this._utils.stopSpinner();
        this._utils.toast('Tarjeta Registrada','success');
        var mPago:any = JSON.stringify(response.data);
        await localStorage.setItem('mPagoVT',mPago);
        return this.modalCtrl.dismiss('comfirmar', 'confirm');
      });
    }else{
      this._utils.toast('Datos Incompletos','danger');
    }
  }

  close(){
    return this.modalCtrl.dismiss('close', 'close');
  }

}
