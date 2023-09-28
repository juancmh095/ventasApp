import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  model:any = {};
  iPass:any = 'password';
  constructor(
    private router: Router,
    private _api:ApiService,
    private _utils:UtilsService
  ) { }

  ngOnInit() {
  }


  login(){
    console.log(this.model);
    this._api.post('login',this.model).then((response:any) => {
      console.log(response);
      if(response.status){
        localStorage.setItem('token',response.token)
        this.router.navigate(['home'])
      }else{
        this._utils.toast(response.text,'danger');
      }
    })
  }

  changeType(){
    if(this.iPass == 'password'){
      this.iPass = 'text';
    }else{
      this.iPass = 'password';
    }
  }

}
