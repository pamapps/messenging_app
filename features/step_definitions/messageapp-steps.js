'use strict';
var _ = require('underscore');
// var assert =  stuff.assert;
var {defineSupportCode} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var Log = require('../support/log');
var LoginPage = require('../pages/login-page');
var {expect} = require('chai');
var moment = require('moment');
var util = require('util');
var log = new Log(__filename);

var myStepDefinitionsWrapper = function () {

    // this 'require' make our "World" available
    this.World = require('../support/world.js').World;

    // the selenium webdriver will get filled in by "this.Before()"
    var driver = null;

    //------------------------------------------------------------------------------------
    // Steps
    //------------------------------------------------------------------------------------

    this.Before(function (scenario, callback) {
        driver = this.driver;   // from world.js -- this is World.driver !?!?!?
        callback();
    });

    this.Given(/^I am at the login screen for the Messaging App$/, function (callback) {

        this.driver.get('http://localhost:4200');
        callback();
    });


    this.When(/^I should see the login card$/, function (callback) {
        this.driver.wait(until.elementLocated(By.id('login-card')));
        this.driver.findElements(By.id('login-card'))
            .then(function() {
                callback();
            });
    });




    this.When(/^I log in with "([^"]*)" and "([^"]*)"$/, function (username, password, callback) {
        new LoginPage(driver)
            .then(function (LoginPage) {
                log.info("got the chat page");
                return LoginPage.login(username, password);
            })
            .then(function (truth) {
                log.info("After login we have: " + truth);
                log.info("Login successful");
                callback();
            });
    });


};
module.exports = myStepDefinitionsWrapper;