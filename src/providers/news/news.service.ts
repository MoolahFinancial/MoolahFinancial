import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the PortfolioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  readonly ROOT_URL = 'https://api.iextrading.com/1.0';

  constructor(public http: HttpClient) { }

  //currently only gets news relevant to APPL
  //update to get other news later
  //currently only gets news relevant to APPL
  //update to get other news later
  //change so that we can do multiple companies (the JSON separates them by company)
  // /stock/market/batch?symbols=fb,snap,googl&types=news&last=3
  getNews() {
    return new Promise(resolve => {
      this.http.get(this.ROOT_URL+'/stock/googl/news/last/3').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
