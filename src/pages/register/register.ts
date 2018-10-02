import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

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
  users = []
  user = {};

  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider) {
    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.loadUserData();
      }
    });
  }

  // Retrieves all users stored in our database
  loadUserData() {
    this.databaseProvider.getAllUsers().then(data => {
      this.users = data;
    });
  }

  // Adds our user to the database
  addUser(){
    this.databaseProvider.addUser(this.user['firstName'], this.user['middleName'], this.user['lastName'])
    .then(data => {
      this.loadUserData(); // Recall the method to display all users
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
