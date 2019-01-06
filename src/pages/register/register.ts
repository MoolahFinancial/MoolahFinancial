import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/emailValidator';
import { PasswordValidator } from '../../validators/passwordValidator';

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

  // Variables to hold values inside the register form
  registerForm: FormGroup;
  post: any; // A reference for our submitted form
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, public userProvider: UserProvider, public emailValidator: EmailValidator) {
    this.registerForm = formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email]), 
      emailValidator.checkEmail.bind(emailValidator)],
      // , emailValidator.checkEmail.bind(emailValidator)],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
      'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])]
    }, {
      validator: PasswordValidator.confirmPasswordMatch.bind(this)
    });
    
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(post) {
    this.firstName = post.firstName.toLowerCase();
    this.lastName = post.lastName.toLowerCase();
    this.email = post.email.toLowerCase();
    this.password = post.password;
    this.confirmPassword = post.confirmPassword;

    console.log(this.firstName, this.lastName, this.email, this.password, this.confirmPassword);
  }


  // registerUser(){
  //   //console.log(this.firstName, this.lastName, this.email, this.password, this.confirmPassword);

  //   // this.userProvider.registerUser(this.firstName, this.lastName, this.email, this.password);

  //   //this.navCtrl.push(TabsPage);
  // }

}
