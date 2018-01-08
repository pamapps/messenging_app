import { AppPage } from './app.po';
import {LoginPage} from './login.po';
import {GuestInfoPage} from './guest.po';
import {AnalyticsPage} from './login.po';
import {browser, by, element} from 'protractor';

describe('client App', () => {
  let appPage: AppPage;
  let loginPage: LoginPage;
  let guestInfoPage: GuestInfoPage;
  let analyticsPage: AnalyticsPage;


  beforeEach(() => {
    appPage = new AppPage();
    loginPage = new LoginPage();
    guestInfoPage = new GuestInfoPage();
    analyticsPage = new AnalyticsPage;
  });

  it('should login', () => {
    loginPage.navigateTo();
    loginPage.loginUser('fisjo04', 'sp0nge3');

    expect(appPage.getAppText()).toEqual('Intelligent Life Experience');
  });

  it('Guest Page should show', () => {
    expect(guestInfoPage.getHeaderText()).toEqual('Guest Info');
  });

  xit('Change to Analytics App', () => {
    appPage.clickAnalytics();
    browser.switchTo().frame(element(by.id('guest-iframe')));
    // browser.switchTo().frame('iframe');
    expect(analyticsPage.getAnalyticsAppText()).toEqual('Alerts');
  });

});
