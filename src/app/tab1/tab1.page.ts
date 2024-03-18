import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/services/api.service';
import { CarritoPage } from '../carrito/carrito.page';
import { UtilsService } from 'src/services/utils.service';
import { ProductosService } from 'src/services/productos.service';
import { AgregarDireccionPage } from '../direcciones/agregar-direccion/agregar-direccion.page';



declare var bootstrap:any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  direccion:any = {};
  data:any = [];
  productos:any = [];
  productosSelect:any = [];
  numbersCant:any = [];
  categorias:any = [];
  cupones:any = [];
  api:any = environment.api;
  numPage:any = 1;
  searchP:string = '';
  inititalProducts:any = false;
  constructor(public _api:ApiService,
    private _productosService:ProductosService,
    private modalCtrl: ModalController,
    public _utils:UtilsService) {}


  async ngOnInit() {
    var dt:any = localStorage.getItem('myDireccionVT');
    this.direccion = JSON.parse(dt);
    console.log(this.direccion);
    this.getCategorias();
    this.loadInfoProductos({});
    this.loadStorageCarrito();

    this.getCupones();

    const myCarouselElement = document.querySelector('#promosBanner')

    const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval: 3000,
      touch: false
    })
  }


  getCategorias(){
    this._api.get('producto/categorias',{}).then((response:any) => {
      console.log('CATEGORIAS:::::::::::::::::::::>',response);
      this.categorias = response.data;
    });
  }

  loadStorageCarrito(){
    var c:any = localStorage.getItem('carrito');
    if(c){
      this.productosSelect = JSON.parse(c);
    }
  }


  loadInfoProductos(event:any){
    this. numPage = 1;
    this.productos = [];
    var filter = {
      page:this.numPage,
      rpp: 100
    };
    this._productosService.get(filter).then((response:any)=>{
      //this.data = response;
      this.productos = response;
      this.numbersCant = [];
      event.target?.complete();
      this.stopSpinner();
    })
   /*  this._api.get('producto/categorias',{}).then((response:any) => {
    }); */
  }

  loadInfoProductosScroll(event:any){
    if(this.searchP != ''){
      let filter = {
        page:this.numPage,
        rpp: 100,
        nombre: this.searchP
      };
      this._productosService.get(filter).then((response:any)=>{
        response.forEach((p:any) => {
          this.productos.push(p);
        });
        this.stopSpinner();
      })
    }else{
      var filter = {
        page:this.numPage,
        rpp: 100
      };
      this._productosService.get(filter).then((response:any)=>{
        console.log(response);
        response.forEach((element:any) => {
          this.productos.push(element);
        });
        event.target?.complete();
        this.stopSpinner();
      });
    }
   /*  this._api.get('producto/categorias',{}).then((response:any) => {
    }); */
  }

  loadproductCategoria(name:any){
    var categoria = name.toUpperCase();
    console.log(categoria);
    var filter = {
      page:this.numPage,
      rpp: 100,
      nombre: name
    };
    this._productosService.get(filter).then((response:any)=>{
      console.log(response);
      this.productos = response;
      this.inititalProducts = true;
      this.stopSpinner();
    });
  }

  info(data:any){
    this.productos = data?data:[];
  }

  async cantProduct(type:'+'|'-',id:any,index:any){
    var productoIdx:any = await this.loadIndexID(this.productosSelect,id);
    console.log(productoIdx,id,index);
    if(productoIdx != null){
      if(type == '+'){
        this.productosSelect[productoIdx].cantidad = this.productosSelect[productoIdx].cantidad + 1;
        this.numbersCant[index] = this.productosSelect[productoIdx].cantidad;
      }else{
        this.productosSelect[productoIdx].cantidad = this.productosSelect[productoIdx].cantidad - 1;

        this.productosSelect[productoIdx].cantidad = this.productosSelect[productoIdx].cantidad < 0?0:this.productosSelect[0].cantidad;
        this.numbersCant[index] = this.productosSelect[productoIdx].cantidad;

        if(this.numbersCant[index] == 0){
          this.productosSelect.splice(productoIdx,1);
        }

      }
    }else{
      if(type == '+'){
        let m = {
          _id:id,
          producto: this.productos[index],
          cantidad: 1
        }
        this.productosSelect.push(m);
        this.numbersCant[index] = 1;
      }
    }

    var p = JSON.stringify(this.productosSelect);
    localStorage.setItem('carrito',p);
    console.log(this.productosSelect,this.numbersCant);
  }

  async loadIndexID(arr:any,value:any){
    var i = null
    for (let x = 0; x < arr.length; x++) {
      const element = arr[x];
      if(element._id == value){
        i = x;
      }
    }

    return i;
  }

  async openCarrito(){
    const modal = await this.modalCtrl.create({
      component: CarritoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data)
    }
  }

  stopSpinner(){
    setTimeout(() => {
      this._utils.stopSpinner();
    }, 3000);
  }

  async loadModalDir(){
    const modal = await this.modalCtrl.create({
      component: AgregarDireccionPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      var dt:any = localStorage.getItem('myDireccionVT');
      this.direccion = JSON.parse(dt);
    }

  }

  getCupones(){
    var model = {
      delete: false
    }
    this._api.get('cupon', model).then((response:any) => {
      this.cupones = response.data;
    });
  }

  onIonInfinite($event:any){
    this.numPage = this.numPage +1;
    this.loadInfoProductosScroll({});
    setTimeout(() => {
      ($event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  loadProductosName(event:any){
    if(this.searchP == ''){
      this.loadInfoProductos({});
    }else{
      var filter = {
        page:1,
        rpp: 100,
        nombre: this.searchP
      };
      this._productosService.get(filter).then((response:any)=>{
        this.productos = response;
        this.stopSpinner();
      })
    }
  }

}
