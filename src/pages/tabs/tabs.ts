import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { HomePage } from '../home/home';
import { InvestPage } from '../invest/invest';
import { PerformancePage } from '../performance/performance';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = InvestPage;
  tab3Root = PerformancePage;
  tab4Root = AccountPage;

  constructor() {

  }
}
