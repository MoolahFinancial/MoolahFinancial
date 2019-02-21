import { Component, ViewChild } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { UserProvider } from '../../providers/user/user.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  users: any;
  doughnutChart: any;
  lineChart: any;
  portfolio: any;
  myPortfolio: any;
  myTitle: any;
  myHoldings: any;

  constructor(public navCtrl: NavController, public app: App, public portfolioProvider: PortfolioProvider, public userProvider: UserProvider) {
    // If the current user is either null or undefined, return to the login screen
    if(this.userProvider.currentUser == null)
    {
      var nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    } else {
      console.log(this.userProvider.currentUser, "current user on home page");

      //this.getUsers();
      this.getPortfolios();

      //this.myPortfolio = this.portfolio[0];
      //console.log(this.myPortfolio);
    }
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

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
          label: 'Portfolio Performance',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [10,13,7,9,14,22,19,25,15,18,22,27],
          spanGaps: false,
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

  // TODO: Marked for deletion once development is done (only used for testing)
  getUsers() {
    this.userProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  // Swipe Right to go to account tab
  swipe(event: any) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(4);
    }
  }

}
