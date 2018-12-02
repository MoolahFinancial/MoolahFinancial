import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;
  port: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getUsers();
    this.getPort();
  }

  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  getPort(){
    this.restProvider.getPort()
    .then(data => {
      this.port = data;
      console.log(this.port);
    });
  }

}
