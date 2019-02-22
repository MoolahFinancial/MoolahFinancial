import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserTagData } from '../models';
import { UserProvider } from '../user/user.service';
import { FormProvider } from '../form/form.service';

@Injectable()
export class TagProvider {
  readonly ROOT_URL = 'https://moolah-financial-api.azurewebsites.net/api'; // Base url for api calls

  constructor(public http: HttpClient, public userProvider: UserProvider, public formProvider: FormProvider) {
    console.log('Hello TagProvider Provider');
  }

  // Calls the api for generating new user tags
  generateUserTagApi(data: any): Promise<UserTagData> {
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
  deleteUserTagApi(question_text: string): Observable<UserTagData> {

    // Add the user_id and question_text params to the url for the api call
    const params = new HttpParams().set('user_id', String(this.userProvider.currentUser.user_id)).set('question_text', question_text);

    return this.http.delete<UserTagData>(this.ROOT_URL + '/tags/deleteUserTag', { params } );
  }

  // Checks if a user_tag with the same user_id and question_text already exists or not
  checkForUserTagApi(question_text: string): Observable<boolean> {
    // Add the user_id and question_text params to the url for the api call
    const params = new HttpParams().set('user_id', String(this.userProvider.currentUser.user_id)).set('question_text', question_text);

    return this.http.get<boolean>(this.ROOT_URL + '/tags/checkForUserTag', { params } );
  }

  generateUserTag(questionText: string, questionAnswer: string, tagId: number) {
    // The json object representing the new user_tag we will insert into the database
    var newUserTagJson = {
      "user_id": this.userProvider.currentUser.user_id,
      "tag_id": tagId,
      "question_text": questionText,
      "question_answer": questionAnswer
    };

    // Generate a new user tag based on the passed in json object
    this.generateUserTagApi(newUserTagJson).then((result) => {
      if(result.success)
      {
        console.log(result);
        // Display a toast telling the user their response was saved
        this.formProvider.showToast("Response Saved", 4000);
      } else {
        console.log("Error while generating new tag (result.success = false): ", result);
      }
    }, (err) => {
      console.log("Error while generating new tag: ", err);
    });
  }

  evalUserAnswer(questionText: string, questionAnswer: string, tagId: number) {
    this.checkForUserTagApi(questionText)
    .subscribe(userTagExists => {
      // Check whether the user tag already exists or not
      if(userTagExists) {
        
        console.log("The tag exists!", userTagExists);

        // If the user_tag does exist, delete it (since the user is changing their previous answer)
        this.deleteUserTagApi(questionText)
        .subscribe(data => {
          if(data.success)
          {
            console.log("The tag got deleted", data);
            this.generateUserTag(questionText, questionAnswer, tagId);
          }
          else {
            console.log("ERROR", data);
          }
        });

      } else {
        console.log("The tag does not exist...", userTagExists);

        this.generateUserTag(questionText, questionAnswer, tagId);
      }
    });
  }

}

