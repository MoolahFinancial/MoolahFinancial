import { FormControl } from '@angular/forms';

export class EmailValidator {
    // An Async method which calls an api to check if a given email is already in the db
    static checkEmail(control: FormControl): any {
        return new Promise(resolve => {
            setTimeout(() => {
                //TODO: Call method in UserProvider to call an API to check if an email exists in the db
                if(control.value.toLowerCase() === "bob@gmail.com") {
                    // The email is claimed, so we return saying that the email is already taken
                    resolve({
                        "username taken": true
                    });
                } else {
                    // Otherwise, we return null since the email is unclaimed
                    resolve(null);
                }
            }, 2000);
        });
    }
}