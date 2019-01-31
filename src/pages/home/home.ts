import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { UserProvider } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  users: any;
  doughnutChart: any;
  portfolio: any;
  myPortfolio: any;
  myTitle: any;
  myHoldings: any;

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider, public userProvider: UserProvider) {
    this.getUsers();
    this.getPortfolios();

    //this.myPortfolio = this.portfolio[0];
    //console.log(this.myPortfolio);
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Snapchat", "Facebook", "Google"],
        datasets: [{
          label: 'Portfolio Breakdown',
          data: [5,15,10],
          backgroundColor: [
            'rgba(255,255,102,0.2)',
            'rgba(0,102,255,0.2)',
            'rgba(255,0,102,0.2)',
          ],
          hoverBackgroundColor: [
            "#FFFF66",
            "0066FF",
            "FF0066",
          ]
        }]
      }
    });
  }

  getPortfolios() {
    this.portfolioProvider.getPortfolios()
    .then(data => {
      this.portfolio = data;
      console.log(this.portfolio);
      this.myPortfolio = this.portfolio[0];
      this.myTitle = this.myPortfolio.title;
      this.myHoldings = this.myPortfolio.holdings;
      console.log(this.myPortfolio);
    });
  }

  getUsers() {
    this.userProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }

}
