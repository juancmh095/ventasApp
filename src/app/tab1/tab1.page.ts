import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  direccion:any = {};
  data:any = [];
  productos:any = [];
  constructor(public _http:HttpClient) {}


  async ngOnInit() {
    var dt:any = localStorage.getItem('myDireccionVT');
    this.direccion = JSON.parse(dt);
    console.log(this.direccion);
    this.loadInfoProductos({});
  }


  loadInfoProductos(event:any){
    this._http.get(environment.api+'producto/categorias').subscribe((response:any)=>{
      console.log(response);
      this.data = response.data;
      this.productos = this.data[0].productos;
      event.target?.complete();
    });
  }

  info(data:any){
    this.productos = data?data:[];
  }

}
