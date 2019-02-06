import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { UserProvider } from '../../providers/user/user.service';
import { InvestPage } from '../invest/invest';
import { QuestionPage } from '../quest/quest';
import { Portfolio } from '../../providers/models';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignupPage {

  recommendedPortfolio: Portfolio;

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider, public userProvider: UserProvider) { }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  continue(){
    this.navCtrl.push(InvestPage);
  }

  questionaire(){
    this.navCtrl.push(QuestionPage);
  }

  getBestPortfolio(){
    this.portfolioProvider.getBestPortfolio(this.userProvider.currentUser.user_id).subscribe(data => {
    });
  }
}
