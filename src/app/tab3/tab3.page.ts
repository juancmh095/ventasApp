import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario:any = {};
  constructor() {}

  ngOnInit() {
    var dt:any = localStorage.getItem('userData');
    this.usuario = JSON.parse(dt);
    console.log(this.usuario)
  }

}
