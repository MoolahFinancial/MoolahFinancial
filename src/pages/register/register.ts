import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController,
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
    // Loading component which gets displayed while waiting for a response from the login api
    let registerLoadingController = this.loadingController.create({
      content: "Registering new account..."
    });

    // Display the register loading dialogue
    registerLoadingController.present();

    // The json object we will pass into the body of the RegisterUser api call (need to manually map each component due to different naming conventions)
    var jsonData = {
                      "first_name": post.firstName,
                      "last_name": post.lastName,
                      "email": post.email,
                      "password": post.password
                   };

    this.userProvider.registerUser(jsonData).then((result) => {
      // Hide the register dialogue since the api has returned a response
      registerLoadingController.dismiss();

      if(result.success) {
        this.userProvider.currentUser = result.user; // Set the current user to the logged in user
        this.navCtrl.push(SignupPage);
      } else {
        this.registerError("Something went wrong");
      }
    }, (err) => {
      // Hide the register dialogue since the api has returned a response
      registerLoadingController.dismiss();
      
      console.log(err);
      this.registerError("Email is already registered");
    });
  }

  // Method that is called when the registration api is not successful 
  registerError(errorMessage: string) {
    this.userProvider.currentUser = null;
    window.alert(errorMessage);
  }

}
