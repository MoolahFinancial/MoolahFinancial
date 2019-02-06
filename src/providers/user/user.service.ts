import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, LoginData } from '../models'; // Our custom interface used to represent a user (to allow static typing)
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {
  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api'; // Base url for api calls
  currentUser: User; // Variable being used to store the current user

  constructor(public http: HttpClient) { }

  // TODO: Mark for deletion once development is done
  getUsers(): Promise<User[]> {
    return new Promise(resolve => {
      this.http.get<User[]>(this.ROOT_URL+'/users').subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  registerUser(data: any): Promise<LoginData> {
      return new Promise((resolve, reject) => {
        this.http.post<LoginData>(this.ROOT_URL+'/users/register', data,
        {headers:{'Content-Type': 'application/json'}})
        .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
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
  loginUser(email: string, password: string): Observable<LoginData> {

    // Add the email and password params to the url for the api call
    const params = new HttpParams().set('email', email).set('password', password);

    return this.http.get<LoginData>(this.ROOT_URL + '/users/login', { params } );
  }
}
