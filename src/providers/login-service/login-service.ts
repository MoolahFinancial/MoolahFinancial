import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  apiUrl = 'http://moolah-financial-api.azurewebsites.net/api';

  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
  }

}
