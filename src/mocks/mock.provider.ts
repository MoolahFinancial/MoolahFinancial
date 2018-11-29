import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MockProviderProvider
{

  apiUrl = 'http://moolah-financial-api.azurewebsites.net/api';
  users: any;

   constructor(public http: HttpClient)
   {
   }
   /**
    *
    * Tests that we get users from the database
    *
    * @method getUsers()
    * @return user data if the connection worked
    *
    */
   getUsers()
   {
     return new Promise(resolve => {
       this.http.get(this.apiUrl+'/users').subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
     });
   }
}
