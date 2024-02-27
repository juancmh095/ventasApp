import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {


  model:any = {};


  constructor(
    private _api:ApiService,
    private _utils:UtilsService
  ) { }

  async ngOnInit() {
    this.init()
  }

  async init(){
    this.model = {};
    var user:any = await localStorage.getItem('userData');
    var user = JSON.parse(user);
    console.log(user);
    this.model.telefono = user.persona?.telefono;
    this.model.correo = user.persona?.email;
    this.model.persona = user.persona?._id
  }

  async save(){
    var response = await this._api.post('ticket',this.model);
    console.log(response);
    if(response.status){
      this.init();
      this._utils.toast(response.text,'success');
    }else{
      this._utils.toast(response.text,'danger');
    }
  }

}
