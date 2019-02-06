import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InvestPage } from '../invest/invest';
import { QuestionPage } from '../quest/quest';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController) { }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  continue(){
    this.navCtrl.push(InvestPage);
  }

  questionaire(){
    this.navCtrl.push(QuestionPage);
  }
}
