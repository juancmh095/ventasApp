import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarDireccionPage } from '../direcciones/agregar-direccion/agregar-direccion.page';
import { UtilsService } from 'src/services/utils.service';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { ListadoDireccionesPage } from '../direcciones/listado-direcciones/listado-direcciones.page';


@Component({
  selector: 'app-pedido-confirmar',
  templateUrl: './pedido-confirmar.page.html',
  styleUrls: ['./pedido-confirmar.page.scss'],
})
export class PedidoConfirmarPage implements OnInit {
  model:any = {
    direccion:{},
    productos:[],
    mPago:null,
    total:0,
    subtotal:0,
    iva:0,
    cupon:'',
    tentrega:'2 dias',
    ttentrega:0,
    persona:'',
    pagado: false,
    credito: false,
    origin:'app',
    comentarios:''
  };
  constructor(
    private modalCtrl:ModalController,
    private _Utils:UtilsService,
    private _api:ApiService,
    private router:Router
    ) { }

  ngOnInit() {
    var dir:any = localStorage.getItem('myDireccionVT')?localStorage.getItem('myDireccionVT'):'{}';
    this.model.direccion = JSON.parse(dir);

    var prod:any = localStorage.getItem('carrito')?localStorage.getItem('carrito'):'[]';
    var person:any = localStorage.getItem('userData')?localStorage.getItem('userData'):'[]';
    person = JSON.parse(person);
    this.model.persona = person._id;
    this.model.productos = JSON.parse(prod);
    this.model.productos.forEach((element:any,index:any) => {
      this.model.subtotal += element.producto.precioventabruto;
      this.model.total += (element.producto.precioventabruto * 1.18);
    });
    this.model.iva = this.model.total - this.model.subtotal;
    console.log(this.model);
  }

  async loadModalDir(){
    const modal = await this.modalCtrl.create({
      component: ListadoDireccionesPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data)
      var dt:any = localStorage.getItem('myDireccionVT');
      this.model.direccion = JSON.parse(dt);
      console.log(this.model);
    }

  }

  async save(){
    var usr:any = await localStorage.getItem('userData');
    var usuario = JSON.parse(usr);
    this.model.usuario = usuario._id;
    this.model.direccionID = this.model.direccion._id;
    this.model.mPago = this.model.tarjeta._id;

    if(Object.keys(this.model.direccion).length == 0){
      console.log('no tiene direccion');
      return await this._Utils.toast("Faltan datos de la direccion de entrega","danger");
    }

    console.log('guardar');
    this._Utils.spinner();
    this._api.post('venta/nueva',this.model).then(async (response:any) => {
      console.log(response);
      if(response.status){
        this._Utils.toast("Pedido generado","success");
        setTimeout(async () => {
          await this._Utils.stopSpinner();
          localStorage.removeItem('carrito');
          this.router.navigateByUrl('/home/tab1')
        }, 5000);
      }else{
        this._Utils.toast("Error al procesar el pedido","danger");
      }
    });
  }

}
