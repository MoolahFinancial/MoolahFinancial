import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

// Service which holds methods that are used by multiple forms
@Injectable()
export class FormProvider {

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
}
