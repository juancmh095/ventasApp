import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlApi:any = environment.api;
  constructor(private _utils:UtilsService, private _http:HttpClient) { }


  get(x:any): Promise<any> {
    this._utils.spinner();
    return new Promise((resolve:any)=>{
      try {
        console.log(this.urlApi);
        var filters = JSON.stringify(x);
        this._http.get(this.urlApi + 'lioren/productos',{params:{filters}}).subscribe((resultado:any)=>{
          this._utils.stopSpinner();
          resolve(resultado);
        });
      } catch (error) {
        this._utils.stopSpinner();
        resolve(error);
      }
    })
  }
}
