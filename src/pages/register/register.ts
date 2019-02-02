import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/emailValidator';
import { PasswordValidator } from '../../validators/passwordValidator';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // Variables to hold values inside the register form (these are set by the user)
  registerForm: FormGroup;
  post: any; // A reference for our submitted form

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public userProvider: UserProvider, public emailValidator: EmailValidator) {
    this.registerForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      // ,emailValidator.checkEmail.bind(emailValidator)],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])]
    }, {
      validator: PasswordValidator.confirmPasswordMatch.bind(this)
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(post: any) {
    // The json object we will pass into the body of the RegisterUser api call (need to manually map each component due to different naming conventions)
    var jsonData = {
                      "first_name": post.firstName,
                      "last_name": post.lastName,
                      "email": post.email,
                      "password": post.password
                   };

    this.userProvider.registerUser(jsonData).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  register(){
    this.navCtrl.push(SignupPage);
  }
  // registerUser(){
  //   //console.log(this.firstName, this.lastName, this.email, this.password, this.confirmPassword);

  //   // this.userProvider.registerUser(this.firstName, this.lastName, this.email, this.password);

  //   //this.navCtrl.push(TabsPage);
  // }

}
