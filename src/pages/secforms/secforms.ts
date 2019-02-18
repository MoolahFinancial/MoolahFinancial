import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { QuestionnaireProvider } from '../../providers/questionnaire/questionnaire.service';
import { Question } from '../../providers/models';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'secforms.html'
})
export class SECPage {

  // Holds all of the questions that we've retrieved from the database
  //questions: Question[];

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider, public questionnaireProvider: QuestionnaireProvider) {
    // console.log("On question Page");
    // this.getQuestions();
  }

  // Retrieve all of the questions stored in the database
  // getQuestions() {
  //   this.questionnaireProvider.getQuestions()
  //   .subscribe(data => {
  //     this.questions = data;
  //     console.log(this.questions, "quest");
  //   });
  // }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  submit(){
    //console.log(this.userProvider.currentUser, "current user in logout");
    //this.userProvider.currentUser = null; // Set the current user to null
    // Navigate back to the login page
    this.navCtrl.pop();
    console.log("Previous Page");
  }
}
