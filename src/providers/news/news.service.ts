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

  //gets the news relevant to the company in the past 24 hours
  getNews(company: String) {
    return new Promise(resolve => {
      this.http.get(this.ROOT_URL+'/stock/'+company+'/news/last/24').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
