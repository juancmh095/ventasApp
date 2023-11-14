import { Component, OnInit } from '@angular/core';
import { MapService, Feature } from 'src/services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.page.html',
  styleUrls: ['./agregar-direccion.page.scss'],
})
export class AgregarDireccionPage implements OnInit {
  fill:any;
  direcciones:any;
  direccion:any = {};
  constructor(private mapboxService: MapService, public router:Router, private modalCtrl:ModalController) {
  }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    this.mapboxService.buildMap(coordinates.coords.latitude, coordinates.coords.longitude);
  }

  loadDireccion($event:any){

    this.search($event)
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          console.log(features);
          this.direcciones = features;
        });
      } else {
      }
  }

  loadInfoMap(dir:any){
    console.log(dir);
    this.direccion = dir;
    this.mapboxService.buildMap(dir.center[1],dir.center[0]);
    this.direcciones = [];
  }

  async saveDir(){
    var dir = JSON.stringify(this.direccion);

    await localStorage.setItem('myDireccionVT',dir);
    //this.router.navigate(['home'])
    return this.modalCtrl.dismiss('confirmar', 'confirm');
  }


}
