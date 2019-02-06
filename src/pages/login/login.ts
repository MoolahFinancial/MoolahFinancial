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

  // Variables to toggle the password from being hidden or visible
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController, public navParams: NavParams, private formProvider: FormProvider,
    public userProvider: UserProvider, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  // Toggles the password text and icon depending on whether the password is hidden or visible
  public togglePassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  loginUser(post: any){
    this.userProvider.loginUser(post.email.toLowerCase(), post.password).subscribe(data => {
      if(data.success) {
        this.userProvider.currentUser = data.user; // Set the current user to the logged in user
        this.navCtrl.push(TabsPage);
      } else {
        // If an error occurs during the login, the current user should be null
        this.userProvider.currentUser = null;
        
        // Display an alert telling the user of a failed login
        this.formProvider.loginAlert('No Matching Account', 'Please confirm your email or password');
      }
    });
  }

  // Navigates users to the Register page upon pressing the 'Sign Up' button
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
