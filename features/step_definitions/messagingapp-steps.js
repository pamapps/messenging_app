'use strict';

var {defineSupportCode} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var {expect} = require('chai');

defineSupportCode(function({Given, When, Then}) {

    Given(/^I log into messaging app$/, function (next) {
        this.driver.get('http://localhost:4200');
        this.driver.findElement(By.id('username'))
            .sendKeys('test-user');
        this.driver.sleep(1000);
        this.driver.findElement(By.id('password'))
            .sendKeys('password');
        this.driver.sleep(1000);
        this.driver.findElement(By.id('loginbutton'))
            .click()
            .then(function() {
                next();
            });
    });

    When(/^I see the chat page and can send a hello message$/, function (next) {

        this.driver.wait(until.elementLocated(By.id('chat-screen')));
        this.driver.findElements(By.id('message-input'));

        this.driver.findElement(By.id('message-text'))
            .sendKeys('Hello');
        this.driver.findElements(By.xpath('//*[@id="sendmessage"]/i'));
        this.driver.sleep(1000);
        this.driver.findElement(By.xpath('//*[@id="sendmessage"]/i')).click()
            .then(function() {
                next();
            });
    });
    Then(/^I see the message in the chat$/, function (next) {
        this.driver.sleep(3000);
        this.driver.findElement(By.xpath('//div[contains(string(), "Hello")]'))
            .then(function() {
                next();
            });
    });

});
