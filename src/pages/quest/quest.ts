import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { QuestionnaireProvider } from '../../providers/questionnaire/questionnaire.service';
import { Question } from '../../providers/models';
import { TagProvider } from '../../providers/tag/tag.service';
import { UserProvider } from '../../providers/user/user.service';
//import { InvestPage } from '../invest/invest';

@Component({
  selector: 'page-home',
  templateUrl: 'quest.html'
})
export class QuestionPage {

  // Holds all of the questions that we've retrieved from the database
  questions: Question[];

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider, 
    public questionnaireProvider: QuestionnaireProvider, 
    public tagProvider: TagProvider, public userProvider: UserProvider) {
    console.log("On question Page");

  }

  //TODO: Mark for deletion, we are no longer pulling questions from the database
  // Retrieve all of the questions stored in the database
  getQuestions() {
    this.questionnaireProvider.getQuestions()
    .subscribe(data => {
      this.questions = data;
      console.log(this.questions, "quest");
    });
  }

  generateNewUserTag(questionText: string, questionAnswer: string, tagId: number) {
    // The json object representing the new user_tag we will insert into the database
    var newUserTagJson = {
      "user_id": this.userProvider.currentUser.user_id,
      "tag_id": tagId,
      "question_text": questionText,
      "question_answer": questionAnswer
    };

    // Generate a new user tag based on the passed in json object
    this.tagProvider.generateUserTag(newUserTagJson).then((result) => {
      if(result.success)
      {
        console.log(result);
      } else {
        console.log("Error while generating new tag (result.success = false): ", result);
      }
    }, (err) => {
      console.log("Error while generating new tag: ", err);
    });


  }

  evalUserAnswer(questionText: string, questionAnswer: string, tagId: number) {
    this.tagProvider.checkForUserTag(questionText)
    .subscribe(userTagExists => {
      // Check whether the user tag already exists or not
      if(userTagExists) {
        
        console.log("The tag exists!", userTagExists);

        // If the user_tag does exist, delete it (since the user is changing their previous answer)
        this.tagProvider.deleteUserTag(questionText)
        .subscribe(data => {
          if(data.success)
          {
            console.log("The tag got deleted", data);
            this.generateNewUserTag(questionText, questionAnswer, tagId);
          }
          else {
            console.log("ERROR", data);
          }
        });

      } else {
        console.log("The tag does not exist...", userTagExists);

        this.generateNewUserTag(questionText, questionAnswer, tagId);
      }

    });
    
    
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
            this.evalUserAnswer(question, item, 10);
            break;
          }
          case "married": {
            this.evalUserAnswer(question, item, 6);
            break;
          }
          case "seperated": {
            this.evalUserAnswer(question, item, 8);
            break;
          }
          case "divorce": {
            this.evalUserAnswer(question, item, 8);
            break;
          }
          case "widow": {
            this.evalUserAnswer(question, item, 8);
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
