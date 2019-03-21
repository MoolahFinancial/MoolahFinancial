import { Component, ViewChild } from '@angular/core';
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

  constructor(public navCtrl: NavController, public app: App, public portfolioProvider: PortfolioProvider, public userProvider: UserProvider, public newsProvider: NewsProvider) {
    // If the current user is either null or undefined, return to the login screen
    if(this.userProvider.currentUser == null)
    {
      var nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    } else {
      console.log(this.userProvider.currentUser, "current user on home page");
      this.dataLoaded = false;

      // Initialize donut chart variables here
      this.chartLabels = [""];
      this.holdingWeights = [0];
      this.colors = [""];
      this.hexColors = [""];


      this.getNews();

    }
  }


  ionViewDidLoad() {
    // Get portfolio and holding information, then create doughnut chart.
    this.getPortfolios();

    // Create line chart for portfolio performance
    this.createLineChart();
  }

  getPortfolios() {
    this.portfolioProvider.getBestPortfolioInfo(this.userProvider.currentUser.user_id).subscribe((data: BestPortfolioInfo) => {

      // Store user's portfolio ID number
      this.portfolioId = <number>data.result[0].portfolio_id;

      if (data.success && this.portfolioId != null) {
        this.portfolioProvider.getPortfolioById(this.portfolioId).subscribe((portfolio: Portfolio) => {
          this.userPortfolio = portfolio;
          this.myTitle = this.userProvider.currentUser.first_name + '\'s Portfolio';

          var hold: Holding;
          var i = 0;

          // Get all of the holdings in this portfolio and store them in a list of holdings
          for (i=0; i < portfolio.holdings.length; i++) {
            hold = <Holding>(portfolio.holdings[i]);

            // Calculate an RGBA color value for each holding
            var colorVal = 'rgba(';
            var rgba;
            for (var j = 0; j < 3; j++) {
              var val = Math.floor((Math.random() *255));
              if (j == 0) {
                rgba = [val];
              } else {
                rgba.push(val);
              }
              colorVal += val;
              colorVal += ',';
            }
            colorVal += '0.2)';

            // If we're at the first element, we want to create a new list.
            if (i==0) {
              this.chartLabels = [hold.holding_name];
              this.holdingWeights = [Math.round((hold.weight*100)*100)/100];

              // Set the rgba color values in the chart to the random one calculated
              this.colors = [colorVal];

              // Set the hex color values in the chart to the rgba->hex color with stronger alpha value
              this.hexColors = [this.rgbaToHexA(rgba)];
            } else {
              this.chartLabels.push(hold.holding_name);
              this.holdingWeights.push(((hold.weight*100)*100)/100);

              // Set the rgba color values in the chart to the random one calculated
              this.colors.push(colorVal);

              // Set the hex color values in the chart to the rgba->hex color with stronger alpha value
              this.hexColors.push(this.rgbaToHexA(rgba));
            }
          }

          this.createDoughnutChart();
        });
      }
    });
  }

  createDoughnutChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Portfolio Breakdown',
          data: this.holdingWeights,
          backgroundColor: this.colors,
          hoverBackgroundColor: this.hexColors,
        }]
      },
      options: {
        title: {
          display: true,
          text: this.myTitle,
          fontSize: 18,
        },
        maintainAspectRatio: false,
      }
    });
  }

  createLineChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["Jan-18", "Feb-18", "Mar-18", "Apr-18", "May-18", "June-18", "July-18", "Aug-18", "Sept-18", "Oct-18", "Nov-18", "Dec-18"],
        datasets: [{
          label: this.userProvider.currentUser.first_name + '\'s Portfolio',
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
          data: [100,105,102,110,125,127,130,128,117,112,114,121],
          spanGaps: false,
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Portfolio Performance',
          fontSize: 18,
        },
      }
    });
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
