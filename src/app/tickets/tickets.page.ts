import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {


  data:any = [];

  constructor(
    private _api:ApiService,
    private alertController: AlertController
  ) {

  }

  ngOnInit() {
    this.getTickets();
  }

  async getTickets(){
    var user:any = await localStorage.getItem('userData');
    var user = JSON.parse(user);
    let filters = {
      persona: user.persona
    }
    var response: any = await this._api.get('ticket', filters);
    console.log(response);
    this.data = response.data;
  }

  async alertInfo(item:any) {
    var message = 'No hay respuestas';
    var inputs:any = [];
    if(item.respuestas.length > 0){
      message = 'Atencion:'
      item.respuestas.forEach((element:any) => {
        let model = {
          type: 'textarea',
          value: element.respuesta
        }

        inputs.push(model);
      });
    }
    const alert = await this.alertController.create({
      header: 'Seguimiento de ticket',
      subHeader: 'Soporte',
      message: message,
      buttons: ['Aceptar'],
      inputs: inputs
    });

    await alert.present();
  }
}


