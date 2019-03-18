import { Component, ViewChild, NgZone } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { UserProvider } from '../../providers/user/user.service';
import { NewsProvider } from '../../providers/news/news.service';
import { LoginPage } from '../login/login';
import { Portfolio, BestPortfolioInfo, Holding } from '../../providers/models';
import { InvestPage } from '../invest/invest';

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
  myTitle: string;
  myHoldings: any;
  news: any;
  userPortfolio: Portfolio;
  portfolioId: number;
  chartLabels: [string];
  holdingWeights: [number];
  colors: [string];
  hexColors: [string];
  zone: NgZone;
  dataLoaded: boolean;

  constructor(public navCtrl: NavController, public app: App, public portfolioProvider: PortfolioProvider, public userProvider: UserProvider, public newsProvider: NewsProvider) {
    // If the current user is either null or undefined, return to the login screen
    if(this.userProvider.currentUser == null)
    {
      var nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    } else {
      console.log(this.userProvider.currentUser, "current user on home page");
      this.dataLoaded = false;

      this.chartLabels = [""];
      this.holdingWeights = [0];
      this.colors = [""];
      this.hexColors = [""];


      //this.getUsers();
      this.getPortfolios();
      this.getNews();

      console.log(this.userPortfolio);
      //console.log("nav control" + navCtrl);





      //this.myPortfolio = this.portfolio[0];
      //console.log(this.myPortfolio);
    }
  }

  ionViewWillEnter() {
    //this.getPortfolios();
    this.createDoughnutChart();

  }

  ionViewDidLoad() {
    this.getPortfolios();
    //var chartLabels = [];
    // var holding: any;
    // var hold: Holding;
    // for (holding in this.userPortfolio.holdings) {
    //   hold = <Holding>holding;
    //   chartLabels.push(hold.holding_name);
    // }
    // console.log(chartLabels);

    //this.createDoughnutChart();

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

  createDoughnutChart() {
    console.log(this.chartLabels);

    console.log("Creating doughnut chart")
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: this.chartLabels,//["Snapchat", "Facebook", "Google"], //
        datasets: [{
          label: 'Portfolio Breakdown',
          data: this.holdingWeights, //[5,15,10],
          backgroundColor: this.colors,
            // 'rgba(255,255,102,0.2)',
            // 'rgba(0,102,255,0.2)',
            // 'rgba(255,0,102,0.2)',
          hoverBackgroundColor: this.hexColors,
            // "#FFFF66",
            // "0066FF",
            // "FF0066",
        }]
      },
      options: {
        maintainAspectRatio: false,
      }
    });
  }

  getPortfolios() {
    this.portfolioProvider.getBestPortfolioInfo(this.userProvider.currentUser.user_id).subscribe((data: BestPortfolioInfo) => {
      console.log(data);
      console.log(data.result[0].portfolio_id);
      this.portfolioId = <number>data.result[0].portfolio_id;

      if (data.success && this.portfolioId != null) {
        this.portfolioProvider.getPortfolioById(this.portfolioId).subscribe((portfolio: Portfolio) => {
          console.log(portfolio);
          this.userPortfolio = portfolio;
          console.log(this.userPortfolio);
          this.myTitle = portfolio.title;

          var holding: any;
          var hold: Holding;
          var i = 0;
          //var chartLabel = [];
          for (i=0; i < portfolio.holdings.length; i++) {
            hold = <Holding>(portfolio.holdings[i]);
            console.log(hold);
            console.log(hold.holding_name);

            var colorVal = 'rgba(';
            var rgba;
            for (var j = 0; j < 3; j++) {
              var val = Math.floor((Math.random() *255));
              if (j == 0) {
                rgba = [val];
              } else {
                rgba.push(val);
              }
              colorVal += val;//Math.floor((Math.random() *255));
              colorVal += ',';
            }
            colorVal += '0.2)';

            if (i==0) {
              this.chartLabels = [hold.holding_name];
              this.holdingWeights = [hold.weight*100];

              this.colors = [colorVal];

              this.hexColors = [this.rgbaToHexA(rgba)];
            } else {
              this.chartLabels.push(hold.holding_name);
              this.holdingWeights.push(hold.weight*100);

              this.colors.push(colorVal);
              //this.colors.push('rgba(255,255,102,0.2)');
              this.hexColors.push(this.rgbaToHexA(rgba));
            }
          }
          this.dataLoaded = true;
          console.log(this.dataLoaded);

          //this.chartLabels = chartLabel;
          console.log(this.chartLabels);
          console.log(this.holdingWeights);
          console.log(this.colors);
          console.log(this.hexColors);
          this.createDoughnutChart();

          if (this.doughnutChart != null) {
            //this.doughnutChart.update();
            console.log("Updated chart");
          }

          // let active = this.navCtrl.getActive();
          // this.navCtrl.pop();
          // this.navCtrl.push(active.component);

        });
      }

    });




    //this.myHoldings = this.myPortfolio.holdings;

    //console.log(this.userPortfolio);
    //console.log(this.myHoldings);



    // .then(data => {
    //   this.portfolio = data;
    //   console.log(this.portfolio);
    //   this.myPortfolio = this.portfolio[0];
    //   this.myTitle = this.myPortfolio.title;
    //   this.myHoldings = this.myPortfolio.holdings;
    //   console.log(this.myPortfolio);
    //   console.log(this.myHoldings);
    //});
  }

  rgbaToHexA(rgb) {
    var r = rgb[0].toString(16);
    var g = rgb[1].toString(16);
    var b = rgb[2].toString(16);
    var a = Math.round(0.5*255).toString(16);//Math.round(rgb[3] * 255).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;
}

  //relevant news for portfolio
  getNews()
  {
    this.newsProvider.getNews('googl')
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
