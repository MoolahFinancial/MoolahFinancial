import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // Variables to hold values inside the register form
  loginForm: FormGroup;
  username:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
  }

  loginUser(post){
    console.log(post.email.toLowerCase());
    console.log(post.password);

    

    this.navCtrl.push(TabsPage);
  }

  // Navigates users to the Register page upon pressing the 'Sign Up' button
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
