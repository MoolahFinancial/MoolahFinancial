import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PortfolioProvider } from '../../providers/portfolio/portfolio.service';
import { QuestionnaireProvider } from '../../providers/questionnaire/questionnaire.service';
import { Question } from '../../providers/models';
//import { InvestPage } from '../invest/invest';

@Component({
  selector: 'page-home',
  templateUrl: 'secforms.html'
})
export class SECPage {

  // Holds all of the questions that we've retrieved from the database
  //questions: Question[];
  masks: any;
  phoneNumber: any ="";

  constructor(public navCtrl: NavController, public portfolioProvider: PortfolioProvider, public questionnaireProvider: QuestionnaireProvider) {
    // console.log("On question Page");
    // this.getQuestions();
    this.masks = {
            phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    };
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

  // continue(){
  //   this.navCtrl.push(InvestPage);
  // }
}
