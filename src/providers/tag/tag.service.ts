import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserTagData } from '../models';
import { UserProvider } from '../user/user.service';

@Injectable()
export class TagProvider {
  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api'; // Base url for api calls

  constructor(public http: HttpClient, public userProvider: UserProvider) {
    console.log('Hello TagProvider Provider');
  }

  // Calls the api for generating new user tags
  generateUserTag(data: any): Promise<UserTagData> {
    return new Promise((resolve, reject) => {
      this.http.post<UserTagData>(this.ROOT_URL + '/tags/userTag', data,
      {headers:{'Content-Type': 'application/json'}})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Calls the api to delete an existing user tag (based on the user_id & the question_text)
  deleteUserTag(question_text: string): Observable<UserTagData> {

    // Add the user_id and question_text params to the url for the api call
    const params = new HttpParams().set('user_id', String(this.userProvider.currentUser.user_id)).set('question_text', question_text);

    return this.http.delete<UserTagData>(this.ROOT_URL + '/tags/deleteUserTag', { params } );
  }

  // Checks if a user_tag with the same user_id and question_text already exists or not
  checkForUserTag(question_text: string): Observable<boolean> {
    // Add the user_id and question_text params to the url for the api call
    const params = new HttpParams().set('user_id', String(this.userProvider.currentUser.user_id)).set('question_text', question_text);

    return this.http.get<boolean>(this.ROOT_URL + '/tags/checkForUserTag', { params } );
  }

}

