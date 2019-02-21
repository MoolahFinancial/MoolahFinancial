import { Component, ViewChild } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { UserProvider } from '../../providers/user/user.service';
import { NewsProvider } from '../../providers/news/news.service';
import { LoginPage } from '../login/login';

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
  news: any;

  constructor(public navCtrl: NavController, public app: App, public portfolioProvider: PortfolioProvider, public userProvider: UserProvider, public newsProvider: NewsProvider) {
    // If the current user is either null or undefined, return to the login screen
    if(this.userProvider.currentUser == null)
    {
      var nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    } else {
      console.log(this.userProvider.currentUser, "current user on home page");

      //this.getUsers();
      this.getPortfolios();
      this.getNews();

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

  //relevant news for portfolio
  getNews()
  {
    this.newsProvider.getNews()
    .then(data => {
      this.news = data;
      console.log(this.news);
    })
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
