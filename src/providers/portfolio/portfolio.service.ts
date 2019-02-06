import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PortfolioData } from '../models';

/*
  Generated class for the PortfolioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PortfolioProvider {

  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api';

  constructor(public http: HttpClient) { }

  getPortfolios() {
    return new Promise(resolve => {
      this.http.get(this.ROOT_URL+'/Portfolios').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // Returns one portfolio based on what we believe is the best recommendation for the current user
  getBestPortfolio(userId: number): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(this.ROOT_URL + '/Portfolios/bestPortfolio/' + userId);
  }

}
