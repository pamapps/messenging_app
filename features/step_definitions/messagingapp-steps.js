'use strict';

var stuff = require('../support/stuff');
var assert = stuff.assert; // require('assert');

var {defineSupportCode} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var {expect} = require('chai');

defineSupportCode(function ({Given, When, Then}) {

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
            .then(function () {
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
            .then(function () {
                next();
            });
    });
    Then(/^I see the message in the chat$/, function (next) {
        this.driver.sleep(3000);
        this.driver.findElement(By.xpath('//div[contains(string(), "Hello")]'))
            .then(function () {
                next();
            });
    });

    Given(/^I log into messaging app with "([^"]*)" and "([^"]*)"$/, function (username, password, next) {
        this.driver.get('http://localhost:4200');
        this.driver.findElement(By.id('username'))
            .sendKeys(username);
        this.driver.sleep(1000);
        this.driver.findElement(By.id('password'))
            .sendKeys(password);
        this.driver.sleep(1000)
            .then(function () {
                next();
            });
    });

    When(/^He clicks login$/, function (next) {
        this.driver.findElement(By.id('loginbutton'))
            .click()
            .then(function () {
                next();
            });
    });


    Then(/^the login fails$/, function (next) {

        this.driver.findElement(By.xpath('//*[@id="login-card"]/div/p'))
            .then(function (element) {
                return element.getText()
                    .then(function (text) {
                        assert.equals("Incorrect username or password", text, "Incorrect Error Message Displayed");
                        next();
                    });
            });
    });

});

