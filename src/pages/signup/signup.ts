import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InvestPage } from '../invest/invest';
import { QuestionPage } from '../quest/quest';
import { SECPage } from '../secforms/secforms';
import { BankingPage } from '../banking/banking';
import {TabsPage} from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user.service';
import { ApiData } from '../../providers/models';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public userProvider: UserProvider) { }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  continue(){
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
