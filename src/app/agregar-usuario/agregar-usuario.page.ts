import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';


@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  model:any = {};
  constructor(
    public _api:ApiService,
    public _utils:UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  save(){
    this._api.post('cliente',this.model).then((response:any) => {
      console.log(response);
      if(response.status){
        this._utils.toast('Usuario registrado, Ya puede iniciar session','success');
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 1600);
      }else{
        this._utils.toast('Error de registro','warning');
      }
    })
  }

}
