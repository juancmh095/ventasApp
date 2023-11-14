import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productosSelect:any = [];
  numbersCant:any = [];
  subtotal:any = 0;
  total:any = 0;
  constructor(private modalCtrl: ModalController, private router:Router) {}

  ngOnInit() {
    var c:any = localStorage.getItem('carrito');
    this.productosSelect = JSON.parse(c);
    this.productosSelect.forEach((element:any,index:any) => {
      this.numbersCant[index] = element.cantidad;
      this.subtotal += element.producto.precioventabruto;
      this.total += (element.producto.precioventabruto * 1.18);
    });
  }

  async cantProduct(type:'+'|'-',id:any,index:any){
    var productoIdx:any = index;
    console.log(productoIdx);
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
    }

    this.resum();
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  resum(){
    this.subtotal = 0;
    this.total = 0;
    this.productosSelect.forEach((element:any,index:any) => {
      this.numbersCant[index] = element.cantidad;
      this.subtotal += element.producto.precioventabruto;
      this.total += (element.producto.precioventabruto * 1.18);
    });
  }

  confirm() {
    this.router.navigateByUrl('/home/tab1/pedido-confirmar')
    return this.modalCtrl.dismiss('confirmar', 'confirm');
  }
}
