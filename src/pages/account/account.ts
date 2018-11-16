import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController, public app: App) {

  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout() {
    console.log("Logout");
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

}
