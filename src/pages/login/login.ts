import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProvider } from '../../providers/user/user.service';
import { FormProvider } from '../../providers/form/form.service';
//import { AlertController } from 'ionic-angular';

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

  // Variables to hold values inside the login form
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formProvider: FormProvider,
    public userProvider: UserProvider, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  // Login method
  loginUser(post: any){
    this.userProvider.loginUser(post.email.toLowerCase(), post.password).subscribe(data => {
      if(data.success) {
        this.userProvider.currentUser = data.user; // Set the current user to the logged in user
        this.navCtrl.push(TabsPage);
      } else {
        // If an error occurs during the login, the current user should be null
        this.userProvider.currentUser = null;
        console.log(data.message, "Error msg");
        // Display different errors to the user depending on what error message we received from the server
        if(data.message.includes("deactivated")) {
          // Deactivated Account
          this.formProvider.loginAlert('Deactivated Account', 'This account has been deactivated');
        } 
        else if(data.message.includes("No matching")) {
          // Email and Password don't correspond with an existing user
          this.formProvider.loginAlert('No Matching Account', 'Please confirm your email or password');
        }
        else {
          // Something else went wrong (blame it on them)
          this.formProvider.loginAlert('No Connection', 'Please check your network connection');
        }
      }
    });
  }

  // Navigates users to the Register page upon pressing the 'Sign Up' button
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
