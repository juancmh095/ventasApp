import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { PedidoInfoPage } from '../modals/pedido-info/pedido-info.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private values: string[] = ['first', 'second', 'third'];
  data:any = [];
  usuario:any = {};
  status:any = ['Pendiente','Aceptado','Enviado','Finalizado'];
  statusColor:any = ['bg-warning','bg-info','bg-primary','bg-success'];
  constructor(
    private _api: ApiService,
    private modalCtrl:ModalController
  ) {}

  ngOnInit() {
    var dt:any = localStorage.getItem('userData');
    this.usuario = JSON.parse(dt);
    let model = {
      persona: this.usuario.persona._id
    }
    this._api.get('ventas',model).then((response:any) => {
      console.log(response);
      this.data = response.data;
    });
  }



  accordionGroupChange = (ev: any) => {
    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );
  };

  async openModalPedido(item:any){
    const modal = await this.modalCtrl.create({
      component: PedidoInfoPage,
      componentProps: {data:item}
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      var message = `Hello, ${data}!`;
    }
  }


}
