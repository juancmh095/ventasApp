import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapService } from 'src/services/map.service';

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.page.html',
  styleUrls: ['./pedido-info.page.scss'],
})
export class PedidoInfoPage implements OnInit {
  @Input() data: any;
  status:any = ['Pendiente','Aceptado','Enviado','Finalizado'];
  statusColor:any = ['bg-warning','bg-info','bg-primary','bg-success'];
  constructor(
    private modalCtrl:ModalController,
    private mapboxService: MapService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.mapboxService.buildMap(this.data.direccion.center[1], this.data.direccion.center[0]);
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
