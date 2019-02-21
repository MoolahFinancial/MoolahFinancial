import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTagData } from '../models';

@Injectable()
export class TagProvider {
  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api'; // Base url for api calls

  constructor(public http: HttpClient) {
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

}

