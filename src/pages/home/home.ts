import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserProvider } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  users: any;
  doughnutChart: any;

  constructor(public navCtrl: NavController, public userProvider: UserProvider) {
    this.getUsers();
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Snapchat", "Facebook", "Google", "Airbnb"],
        datasets: [{
          label: 'Portfolio Breakdown',
          data: [5,15,17,15],
          backgroundColor: [
            'rgba(255,255,102,0.2)',
            'rgba(0,102,255,0.2)',
            'rgba(255,0,102,0.2)',
            'rgba(255,153,102.0.2)'
          ],
          hoverBackgroundColor: [
            "#FFFF66",
            "0066FF",
            "FF0066",
            "FF9966"
          ]
        }]
      }
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
