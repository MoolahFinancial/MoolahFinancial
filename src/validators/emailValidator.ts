import { FormControl } from '@angular/forms';
import { UserProvider } from '../providers/user/user';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailValidator {
    
    debouncer: any;
    emailClaimed: any;
    
    constructor(public userProvider: UserProvider) {
        
    }

    // An Async method which calls an api to check if a given email is already in the db
    checkEmail(control: FormControl): any {
        
        clearTimeout(this.debouncer);

        return new Promise(resolve => {
            console.log("Entering emailValidator Promise...");
            this.debouncer = setTimeout(() => {
               
                console.log("Entering timeout in Promise...");
                // this.userProvider.validateEmail(control.value).subscribe((res) => {
                //     if(res.ok){
                //         resolve(null);
                //     }
                // }, (err) => {
                //     resolve({'usernameInUse': true});
                // });
                

                // getUsers() {
                //     this.userProvider.getUsers()
                //     .then(data => {
                //       this.users = data;
                //       console.log(this.users);
                //     });
                //   }

                // NOTE: Promise reaches if statement before setting this.emailClaimed (might be because checkEmailAvailable is Async as well)
                this.userProvider.checkEmailAvailable(control.value.toLowerCase())
                .then(data => {
                    this.emailClaimed = data;
                    console.log('Email Claimed Variable Set: ', this.emailClaimed);
                })
                if(this.emailClaimed) {
                    console.log('Resolve(null): ', this.emailClaimed);
                    // Otherwise, we return null since the email is unclaimed
                    resolve(null);
                } else {
                    console.log('Resolve(DoesMatchPassword: true): ', this.emailClaimed);
                    // The email is claimed, so we return saying that the email is already taken
                    resolve({
                        "emailTaken": true
                    }); 
                }

                // //TODO: Call method in UserProvider to call an API to check if an email exists in the db
                // if(control.value.toLowerCase() === "bob@gmail.com") {
                //     // The email is claimed, so we return saying that the email is already taken
                //     resolve({
                //         "username taken": true
                //     });
                // } else {
                //     // Otherwise, we return null since the email is unclaimed
                //     resolve(null);
                // }
            }, 1000);
        });
    }
}