import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
    static confirmPasswordMatch(control: AbstractControl) {
        let password = control.get('password').value;
        let confirmPassword = control.get('confirmPassword').value;
        
        if(password != confirmPassword) {
            control.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            return null;
        }
    }
}