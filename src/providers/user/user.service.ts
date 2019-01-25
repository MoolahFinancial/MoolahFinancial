import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model'; // Our custom interface used to represent a user (to allow static typing)
import 'rxjs/add/operator/map';

// The interface used to represent the json data that is returned from the login function
interface loginData {
  success: string;
  message: string;
  user: User;
}

@Injectable()
export class UserProvider {
  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api';

  users: Observable<User[]>;
  
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  // getUsers() {
  //   return this.http.get<User[]>(this.ROOT_URL + '/users');
  // }

  getUsers() {
    return new Promise(resolve => {
      this.http.get<User[]>(this.ROOT_URL+'/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  registerUser(firstName: string, lastName: string, email: string, password: string) {
    console.log('Register Info: ', firstName, lastName, email, password);
  }

  checkEmailAvailable(email: string) {
    // Add the email param to the url for the api call
    const apiParams = { params: new HttpParams().set('email', email) };

    return new Promise(resolve => {
      this.http.get(this.ROOT_URL + '/users/checkEmail/', apiParams ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // Returns user info if the email and password are correct
  loginUser(email: string, password: string): Observable<loginData> {

    // Add the email and password params to the url for the api call
    const params = new HttpParams().set('email', email).set('password', password);

    return this.http.get<loginData>(this.ROOT_URL + '/users/login', { params } );
  }
}
