import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignupPage {
  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider) {

  }
}
