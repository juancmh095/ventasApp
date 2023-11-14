import { Injectable, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService implements OnInit {

  loading:any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {
    this.createSpinner();
  }

  async ngOnInit() {
  }

  async createSpinner(){
    this.loading = await this.loadingCtrl.create();

  }

  async spinner(){
    this.loading?.present();
  }

  async stopSpinner(){
    await this.loading?.dismiss();
  }

  async toast(msg:any,color:'danger'|'success'|'warning'){
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      color:color
    });

    await toast.present();
  }
}
