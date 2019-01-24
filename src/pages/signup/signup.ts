import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { InvestPage } from '../invest/invest';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider) {

  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  continue(){
    this.navCtrl.push(InvestPage);
  }
}
