import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    this.navCtrl.push(TabsPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
