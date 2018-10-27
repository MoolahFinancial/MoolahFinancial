import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController) {

  }
  items = [
    'General Settings',
    'Bank Information',
    'How old are you?',
    'What is your annual income?',
    'Question 3?',
    'Question 4?'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
