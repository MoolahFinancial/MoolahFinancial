import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  // Variables to hold the user input from the register form
  // NOTE: These use the ngModel which creates a two-way binding (values are automatically updated upon a change in a textField)
  // firstName = "";
  // lastName = "";
  // email = "";
  // password = "";
  // confirmPassword = "";

  registerForm: FormGroup;
  post: any; // A reference for our submitted form
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';



  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public userProvider: UserProvider) {
    this.registerForm = formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)])],
      'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)])]
    });
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(post) {
    this.firstName = post.firstName;
    this.lastName = post.lastName;
    this.email = post.email;
    this.password = post.password;
    this.confirmPassword = post.confirmPassword;
  }


  // registerUser(){
  //   //console.log(this.firstName, this.lastName, this.email, this.password, this.confirmPassword);

  //   // this.userProvider.registerUser(this.firstName, this.lastName, this.email, this.password);

  //   //this.navCtrl.push(TabsPage);
  // }

}
