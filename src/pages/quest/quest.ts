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

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  // Called when the submit button is pressed
  submit(){
    
    this.evalUserAnswer("What Is Your Marital Status?","Single", 6);

    // Navigate back to the sign-up page
    this.navCtrl.pop();
    console.log("Previous Page");
  }
}
