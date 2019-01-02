import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  apiUrl = 'http://moolah-financial-api.azurewebsites.net/api';
  
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
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

  registerUser(firstName, lastName, email, password) {
    console.log('Register Info: ', firstName, lastName, email, password);
  }

  checkEmailAvailable(email: string) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users/checkEmail/'+email).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loginUser(email, password) {
    console.log('Login Info: ', email, password);
  }
}
