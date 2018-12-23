import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // Variables to hold the user input from the register form
  // NOTE: These use the ngModel which creates a two-way binding (values are automatically updated upon a change in a textField)
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  confirmPassword = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    //console.log(this.firstName, this.lastName, this.email, this.password, this.confirmPassword);

    this.userProvider.registerUser(this.firstName, this.lastName, this.email, this.password);

    //this.navCtrl.push(TabsPage);
  }

}
