import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://moolah-financial-api.azurewebsites.net/api';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getUsers() {
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/users').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
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

/*

Format for adding additional methods for the provider

this.http.post(this.apiUrl+'/users', JSON.stringify(data), {
    headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    params: new HttpParams().set('id', '3'),
  })
  .subscribe(res => {
    resolve(res);
  }, (err) => {
    reject(err);
  });

*/
}
