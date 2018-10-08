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
  tab2Root = AccountPage;
  tab3Root = InvestPage;
  tab4Root = PerformancePage;

  constructor() {

  }
}
