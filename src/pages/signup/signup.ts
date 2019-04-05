import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InvestPage } from '../invest/invest';
import { QuestionPage } from '../quest/quest';
import { SECPage } from '../secforms/secforms';
import { BankingPage } from '../banking/banking';
import {TabsPage} from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user.service';
import { ApiData } from '../../providers/models';
import { FormProvider } from '../../providers/form/form.service';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public userProvider: UserProvider, 
    private formProvider: FormProvider, public loadingController: LoadingController) { }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  continue(){
    // Loading component which gets displayed while waiting for a response from the login api
    let LoadingController = this.loadingController.create({
      content: "Assigning Portfolio..."
    });

    // Display the loading message
    LoadingController.present();

    

    // Check that users have filled out at least one question
    this.userProvider.getNumberQuestionsAnswered().subscribe((data: number) => {
      // Hide the loading message since the api has returned a response
      LoadingController.dismiss();
      // Users currently need to answer at least one of the questions which are tied to the database
      if(data < 1) {
        console.log("The User has not filled out enough questions to continue");
        this.formProvider.loginAlert('Action Required', 'Please fill out the remaining questions');
      } else {
        // Mark that the user has successfully filled out the questionnaire
        this.userProvider.updateHasFilledOutQuestionnaire().subscribe((data: ApiData) => {
          if(data.success) {
            // Update the local object representing the user as well
            this.userProvider.currentUser.has_completed_questionnaire = true;
            console.log("User has successfully filled out the questionnaire!", this.userProvider);
          }
        });
        this.navCtrl.push(TabsPage);   
      }
    });   
  }

  questionaire(){
    this.navCtrl.push(QuestionPage);
  }

  secforms(){
    this.navCtrl.push(SECPage);
  }
  banking(){
    this.navCtrl.push(BankingPage);
  }
}
