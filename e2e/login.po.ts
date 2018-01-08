import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/app');
  }
  getLoginPageText() {
    return element(by.id('login-card')).getText();
  }
}
