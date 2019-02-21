import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import our pages
import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { InvestPage } from '../pages/invest/invest';
import { LoginPage } from '../pages/login/login';
import { PerformancePage } from '../pages/performance/performance';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { QuestionPage } from '../pages/quest/quest';
import { SECPage } from '../pages/secforms/secforms';
import { BankingPage } from '../pages/banking/banking';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';

// Import our providers/services
import { PortfolioProvider } from '../providers/portfolio/portfolio.service';
import { UserProvider } from '../providers/user/user.service';
import { EmailValidator } from '../validators/emailValidator';
import { FormProvider } from '../providers/form/form.service';
import { QuestionnaireProvider } from '../providers/questionnaire/questionnaire.service';
import { NewsProvider } from '../providers/news/news.service';


@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    HomePage,
    InvestPage,
    LoginPage,
    PerformancePage,
    RegisterPage,
    TabsPage,
    SignupPage,
    QuestionPage,
    SECPage,
    BankingPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    HomePage,
    InvestPage,
    LoginPage,
    PerformancePage,
    RegisterPage,
    TabsPage,
    SignupPage,
    QuestionPage,
    SECPage,
    BankingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PortfolioProvider,
    UserProvider,
    EmailValidator,
    FormProvider,
    NewsProvider,
    QuestionnaireProvider // Needs to be included as a provider since it is an injectable
  ]
})
export class AppModule {}
