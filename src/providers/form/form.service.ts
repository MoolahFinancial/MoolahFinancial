import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

// Service which holds methods that are used by multiple forms
@Injectable()
export class FormProvider {

  // Variables to toggle the password from being hidden or visible
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public http: HttpClient, private alertCtrl: AlertController) { }

  // Displays an alert to the user
  loginAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  // Toggles the password text and icon depending on whether the password is hidden or visible
  public togglePassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  
}
