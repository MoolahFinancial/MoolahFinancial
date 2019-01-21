import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProvider } from '../../providers/user/user.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, private formBuilder: FormBuilder) {
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
        this.navCtrl.push(TabsPage);
      } else {
        window.alert(data.errorMessage);
      }
    });



    // this.navCtrl.push(TabsPage);
  }

  // Navigates users to the Register page upon pressing the 'Sign Up' button
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
