import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;

  constructor(public navCtrl: NavController, public userProvider: UserProvider) {
    this.getUsers();
  }

  getUsers() {
    this.userProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }

}
