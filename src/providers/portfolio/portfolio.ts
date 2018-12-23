import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PortfolioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PortfolioProvider {

  apiUrl = 'http://moolah-financial-api.azurewebsites.net/api';

  constructor(public http: HttpClient) {
    console.log('Hello PortfolioProvider Provider');
  }

  getPortfolios() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/Portfolios').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
