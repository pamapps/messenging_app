
'use strict';

var _ = require('underscore');
var Log = require('../support/log');
var stuff = require('../support/stuff');
var PageModel = require('../support/page-model');
var util = require('util');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;

var log = new Log(__filename);

/**
 * Login page
 *
 * @param driver A WebDriver instance.
 * @returns {!webdriver.promise.Promise.<?>} A promise that resolves the page.
 * @constructor Creates a new model for the Login page.
 */
function LoginPage (driver) {
    if (driver) {
        this.driver = driver;
        return PageModel.create()

        // HEADER  --  these elements are expected to be always present in the DOM
            .add('usernameField',driver.waitFor(until.elementLocated(By.id('username')), 'login-page.usernameField'))
            .add('passwordField',driver.waitFor(until.elementLocated(By.id('password')), 'login-page.passwordField'))
            .add('login_button',driver.waitFor(until.elementLocated(By.css('loginbutton')), 'login-page.login_button'))
            .add('newuser_button',driver.waitFor(until.elementLocated(By.css('newuser')), 'login-page.login_button'))
            .build(this);
    }
}

/**
 * Login to message app.
 *
 * @param userName and password
 */
LoginPage.prototype.login = function (userName, password) {

    //var userName = "test-user";
    //var password = "password";
    var self = this;

    log.info("Logging in with username '" + userName + "' and password '" + password + "' .... ");

    return this.usernameField.clear().then(function () {
        log.info("Cleared user name field, now enter user name ...");
        return self.usernameField.sendKeys(userName);
    }).then(function () {
        log.info("Entered user name, now clear password field ...");
        return self.passwordField.clear();
    }).then(function () {
        log.info("Cleared password field, now enter password ...");
        return self.passwordField.sendKeys(password);
    }).then(function () {
        log.info("Entered password, now click submit button ...");
        return self.login_button.click();
    }).then(function () {
        log.info("Completed login , clicked the submit button, return true.");
        return true;
    });
};


module.exports = LoginPage;
