import { Component, OnInit } from '@angular/core';
import { MapService, Feature } from 'src/services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.page.html',
  styleUrls: ['./agregar-direccion.page.scss'],
})
export class AgregarDireccionPage implements OnInit {
  fill:any;
  direcciones:any;
  direccion:any = {};
  model:any = {};
  constructor(private mapboxService: MapService,
    public router:Router,
    private modalCtrl:ModalController,
    private _api: ApiService,
    private _utils:UtilsService
    ) {
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
    this.model.maps = dir;
    this.model.lugar = dir.place_name;
    this.mapboxService.buildMap(dir.center[1],dir.center[0]);
    this.direcciones = [];
  }

  async saveDir(){
    var usr:any = await localStorage.getItem('userData');
    var usuario = JSON.parse(usr);
    this.model.usuario = usuario._id;
    console.log(this.model);
    this._utils.spinner();
    if(this.model.nombre && this.model.maps){
      this._api.post('direcciones', this.model).then(async (response:any) => {
        this._utils.stopSpinner();
        this._utils.toast('Direccion registrada','success');
        var dir = JSON.stringify(response.data);
        await localStorage.setItem('myDireccionVT',dir);
        return this.modalCtrl.dismiss('confirmar', 'confirm');
      });
    }else{
      this._utils.toast('Error, Datos Incompletos','danger')
    }
    //this.router.navigate(['home'])
  }

  close(){
    return this.modalCtrl.dismiss('close', 'close');
  }


}
