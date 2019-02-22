import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { QuestionnaireProvider } from '../../providers/questionnaire/questionnaire.service';
import { Question } from '../../providers/models';
import { TagProvider } from '../../providers/tag/tag.service';
import { UserProvider } from '../../providers/user/user.service';
import { FormProvider } from '../../providers/form/form.service';

@Component({
  selector: 'page-home',
  templateUrl: 'quest.html'
})
export class QuestionPage {

  // Holds all of the questions that we've retrieved from the database
  questions: Question[];

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider, 
    public questionnaireProvider: QuestionnaireProvider, 
    public tagProvider: TagProvider, public userProvider: UserProvider, public formProvider: FormProvider) {
    console.log("On question Page");

  }

  /* Available Tags:
  * 6: Very Low
  * 7: Low
  * 8: Conservative
  * 9: Moderate
  * 10: Risky
  */
  itemSelected(question: string, item: string) {
    console.log(question, item);

    switch(question) {
      case "Marital": {
        switch(item) {
          case "single": {
            this.tagProvider.evalUserAnswer(question, item, 10);
            break;
          }
          case "married": {
            this.tagProvider.evalUserAnswer(question, item, 6);
            break;
          }
          case "seperated": {
            this.tagProvider.evalUserAnswer(question, item, 8);
            break;
          }
          case "divorce": {
            this.tagProvider.evalUserAnswer(question, item, 8);
            break;
          }
          case "widow": {
            this.tagProvider.evalUserAnswer(question, item, 8);
            break;
          }
          default: {
            break;
          }
        }
        break;
      }

    }
  }

  // Called when the submit button is pressed
  submit(){
    // Navigate back to the sign-up page
    this.navCtrl.pop();
    console.log("Previous Page");
  }
}
