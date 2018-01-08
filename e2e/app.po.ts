import {browser, by, element, protractor} from 'protractor';

export class ChatPage {
  navigateTo() {
    return browser.get('/');
  }

  getChatPageText() {
    return element(by.id('chat-screen')).getText();
  }
}
