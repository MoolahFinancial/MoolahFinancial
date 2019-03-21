import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PortfolioData, BestPortfolioInfo, Portfolio } from '../models';

/*
  Generated class for the PortfolioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PortfolioProvider {

  portfolio: Portfolio

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

  // Retrieves a specific portfolio based on the passed in id
  getPortfolioById(userId: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.ROOT_URL + '/Portfolios/' + userId);
  }

  getUserPortfolioInfo(userId: number) {
    return new Promise(resolve => {
      this.http.get<BestPortfolioInfo>(this.ROOT_URL + '/Portfolios/bestPortfolioInfo/' + userId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // Returns one portfolio based on what we believe is the best recommendation for the current user
  // (Uses a dummy API that returns the same portfolio no matter what)
  getDummyBestPortfolio(userId: number): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(this.ROOT_URL + '/Portfolios/bestPortfolio/' + userId);
  }

  // Finds the portfolio_id & the number of tags shared between the best portfolio and the current user
  getBestPortfolioInfo(userId: number): Observable<BestPortfolioInfo> {
    console.log("getBestPortfolioInfo called in portfolio.sertice.ts");
    return this.http.get<BestPortfolioInfo>(this.ROOT_URL + '/Portfolios/bestPortfolioInfo/' + userId);
  }

}
