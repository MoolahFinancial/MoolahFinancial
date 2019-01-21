import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
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
      this.http.get(this.apiUrl + '/users/checkEmail/'+email).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // Returns user info if the email and password are correct
  loginUser(email: string, password: string) {
    
    // Add the email and password params to the api call
    const apiParams = { params: new HttpParams().set('email', email).set('password', password) };

    return this.http.get(this.apiUrl + '/users/login', apiParams );
  }
}
