import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApi:any = environment.api;
  constructor(
    public _http:HttpClient,
    private _utils:UtilsService,
    private alertController: AlertController
  ) {}


  post(url:any, body:any): Promise<any> {
    this._utils.spinner();
    return new Promise((resolve:any)=>{
      try {
        this._http.post(this.urlApi + url,body).subscribe((resultado:any)=>{
          this._utils.stopSpinner();
          resolve(resultado);
        }, xhr => {
          console.log(xhr);
        });
      } catch (error) {
        this._utils.stopSpinner();
        resolve(error)
      }
    })
  }

  delete(url:any, body:any): Promise<any> {
    return new Promise(async (resolve:any)=>{

      const alert = await this.alertController.create({
        header: 'Notificación',
        subHeader: 'Eliminar '+url,
        message: 'Confirme que desea continuar con la solicitud',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            handler: () => {
              this._utils.spinner();
              try {
                this._http.delete(this.urlApi + url,{body:body}).subscribe((resultado:any)=>{
                  this._utils.stopSpinner();
                  resolve(resultado);
                }, xhr => {
                  console.log(xhr);
                });
              } catch (error) {
                this._utils.stopSpinner();
              }
            },
          }
        ],
      });

      await alert.present();


    });
  }

  put(url:any, body:any): Promise<any> {
    return new Promise(async(resolve:any)=>{
      const alert = await this.alertController.create({
        header: 'Notificación',
        subHeader: 'Actualizar '+url,
        message: 'Confirme que desea continuar con la solicitud',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            handler: () => {
              this._utils.spinner();
              try {
                this._http.put(this.urlApi + url,body).subscribe((resultado:any)=>{
                  this._utils.stopSpinner();
                  resolve(resultado);
                }, xhr => {
                  console.log(xhr);
                });
              } catch (error) {
                this._utils.stopSpinner();
              }
            },
          }
        ],
      });



    })
  }

  get(url:any, params:any): Promise<any> {
    var filters = JSON.stringify(params);
    this._utils.spinner();
    return new Promise((resolve:any)=>{
      try {
        console.log(this.urlApi + url);
        this._http.get(this.urlApi + url,{params:{filters}}).subscribe((resultado:any)=>{
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
