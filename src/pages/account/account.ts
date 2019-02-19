import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController, public app: App, public userProvider: UserProvider) {

  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout() {
    console.log(this.userProvider.currentUser, "current user in logout");
    this.userProvider.currentUser = null; // Set the current user to null
    // Navigate back to the login page
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  // Swipe Left to go to home tab
  swipe(event: any) {
    if(event.direction === 4) {
      this.navCtrl.parent.select(1);
    }
  }

}
