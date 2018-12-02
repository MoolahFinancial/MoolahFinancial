import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'invest.html'
})
export class InvestPage {

  public technologies : Array<any>;
  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.declareTechnologies();
  }

  declareTechnologies() : void
  {
    this.technologies = [
      {
        name: 'Whole Foods',
        risk: 'Moderate/Risky',
        image: 'assets/imgs/card-amsterdam.png',
        type: 'food'
      },
      {
        name: 'Tesla Motors',
        risk: 'Very Risky',
        image: 'assets/imgs/audi.jpg',
        type: 'auto'
      },
      {
        name: 'Facebook',
        risk: 'Low Risk',
        image: 'assets/imgs/work-7.jpg',
        type: 'tech'
      },
      {
        name: 'Twitter',
        risk: 'Very Risky',
        image: 'assets/imgs/moon.jpg',
        type: 'tech'
      }
    ];
  }

  filterTech(param : any) : void {
    this.declareTechnologies();

    let val : string = param;

    if(val.trim() !== '')
    {
      this.technologies = this.technologies.filter((item) =>
      {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) >-1 || item.risk.toLowerCase().indexOf(val.toLowerCase()) >-1;
      })
    }

  }

  onFilter(category : string) : void
  {
    this.declareTechnologies();
    if (category.trim() !== 'all')
      {
         this.technologies = this.technologies.filter((item) =>
         {
           return item.type.toLowerCase().indexOf(category.toLowerCase()) > -1;
         })
       }
  }
}
