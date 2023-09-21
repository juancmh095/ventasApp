import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading:any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  async spinner(){
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  async stopSpinner(){
    await this.loading?.dismiss();
  }

  async toast(msg:any,color:'danger'|'success'|'warning'){
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color:color
    });

    await toast.present();
  }
}
