import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models';

@Injectable()
export class QuestionnaireProvider {

  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api'; // Base url for api calls

  constructor(public http: HttpClient) {
    console.log('Hello QuestionnaireProvider Provider');
  }

  // Return all of the questions that are currently stored in the database
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.ROOT_URL + '/questions');
  }

}
