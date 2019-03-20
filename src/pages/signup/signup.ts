import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InvestPage } from '../invest/invest';
import { QuestionPage } from '../quest/quest';
import { SECPage } from '../secforms/secforms';
import { BankingPage } from '../banking/banking';
import { HomePage } from '../home/home';

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
    this.navCtrl.push(HomePage);
  }

  questionaire(){
    this.navCtrl.push(QuestionPage);
  }

  secforms(){
    this.navCtrl.push(SECPage);
  }
  banking(){
    this.navCtrl.push(BankingPage);
  }
}
